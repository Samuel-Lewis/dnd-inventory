import { MetaModelType } from "~/api/models/common";

import { RowId } from "./id";

export const generateUpdateExpression = (object: Record<string, any>) => {
  const updated = [];
  const ExpressionAttributeNames: Record<string, string> = {};
  const ExpressionAttributeValues: Record<string, string> = {};

  for (const [key, value] of Object.entries(object)) {
    updated.push(`#${key} = :${key}`);
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = value;
  }
  return {
    UpdateExpression: `SET ${updated.join(", ")}`,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
};

export const createNewMetaModel = (id: RowId): MetaModelType => {
  const now = Date.now();
  return {
    ...id.id(),
    dateCreated: now,
    dateUpdated: now,
    access: "private",
  };
};
