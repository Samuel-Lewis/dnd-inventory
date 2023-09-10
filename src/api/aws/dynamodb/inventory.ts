import { MetaModelSchema, MetaModelType } from "~/api/models/common";
import { Inventory, InventorySchema } from "~/api/models/Inventory";

import { db } from "./common";
import { RowId } from "./id";

export const createInventory = async (
  rowId: RowId,
  inv: Inventory
): Promise<Inventory & MetaModelType> => {
  const id = rowId.assertUser().addInventory(true);
  return await db.create<Inventory>(id, inv);
};

export const readInventory = async (
  rowId: RowId
): Promise<Inventory & MetaModelType> => {
  const id = rowId.assertUser().assertInventory(true);
  const data = await db.read(id);
  return MetaModelSchema.merge(InventorySchema).parse(data.Item);
};

export const updateInventory = async (
  rowId: RowId,
  Inventory: Partial<Inventory>
) => {
  const id = rowId.assertUser().assertInventory(true);
  return await db.update(id, Inventory);
};

export const deleteInventory = async (rowId: RowId) => {
  const id = rowId.assertUser().assertInventory(true);
  // TODO: Check that the rowId is healthy and actually points to an Inventory
  return await db.delete(id);
};

// QUERIES

// // Get all inventories owned by a user
// export const getUserInventories = async (userId: string) => {
//   // Get all inventories that start with `usr#<userId>#inv#`

//   const params = {
//     TableName: db.tableName,
//     KeyConditionExpression: "begins_with(#partitionKey, :userInvPrefix)",
//     ExpressionAttributeNames: {
//       "#partitionKey": "partitionKey",
//       "#userInvPrefix": "userInvPrefix",
//     },
//     ExpressionAttributeValues: {
//       ":user_relation": `usr#${userId}#inv#`,
//     },
//   };

//   const command = new QueryCommand({
//     TableName: db.tableName,
//     KeyConditionExpression: "partitionKey = :pk",
//     ExpressionAttributeValues: {
//       ":pk": `usr#${userId}#inv#`,
//     },
//   });
// };
