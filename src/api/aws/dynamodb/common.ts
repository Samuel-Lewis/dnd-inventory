import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { MetaModelType } from "~/api/models/common";
import { check } from "~/lib/check";

import { createNewMetaModel, generateUpdateExpression } from "./helpers";
import { RowId } from "./id";

const region = check(process.env.NEXT_PUBLIC_AWS_REGION, "Missing AWS_REGION");
const accessKeyId = check(
  process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  "Missing AWS_ACCESS_KEY"
);
const secretAccessKey = check(
  process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  "Missing AWS_SECRET_ACCESS_KEY"
);
const tableName = check(
  process.env.NEXT_PUBLIC_AWS_TABLE_NAME,
  "Missing AWS_TABLE_NAME"
);

export const PARTITION_KEY = "pk";
export const SORT_KEY = "sk";
export const USER_KEY = "usr";
export const ITEM_KEY = "itm";
export const INVENTORY_KEY = "inv";
export const DIVIDER = "#";

export class DynamoTableConnection {
  public readonly tableName;
  public readonly client;
  public readonly docClient;

  constructor(tableKey: string) {
    this.tableName = check(tableKey, "Missing tableKey in dynamodb connection");

    this.client = new DynamoDBClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const marshallOptions = {
      removeUndefinedValues: true, // false, by default.
    };
    const unmarshallOptions = {};

    this.docClient = DynamoDBDocumentClient.from(this.client, {
      marshallOptions,
      unmarshallOptions,
    });
  }

  create = async <T>(id: RowId, entry: T): Promise<T & MetaModelType> => {
    const formed: T & MetaModelType = {
      ...createNewMetaModel(id),
      ...entry,
    };

    const command = new PutCommand({
      TableName: db.tableName,
      Item: formed,
    });
    console.log(
      "🚀 / file: common.ts:74 / DynamoTableConnection / command:",
      command
    );

    await db.docClient.send(command);
    return formed;
  };

  read = async (rowId: RowId) => {
    const command = new GetCommand({
      TableName: db.tableName,
      Key: rowId.key(),
    });

    return await db.docClient.send(command);
  };

  update = async <T>(rowId: RowId, entry: Partial<T>) => {
    const updateExp = generateUpdateExpression({
      dateUpdated: Date.now(),
      ...entry,
    });

    const command = new UpdateCommand({
      TableName: db.tableName,
      Key: rowId.key(),
      ...updateExp,
      ReturnValues: "NONE",
    });
    console.log(
      "🚀 / file: common.ts:106 / DynamoTableConnection / command:",
      command
    );

    return await db.docClient.send(command);
  };

  delete = async (rowId: RowId) => {
    const command = new DeleteCommand({
      TableName: db.tableName,
      Key: rowId.key(),
    });

    return await db.docClient.send(command);
  };
}

export const db = new DynamoTableConnection(tableName);
