import { MetaModelSchema, MetaModelType } from "~/api/models/common";
import { Item, ItemSchema } from "~/api/models/Item";

import { db } from "./common";
import { RowId } from "./id";

export const createItem = async (
  rowId: RowId,
  item: Item
): Promise<Item & MetaModelType> => {
  const id = rowId.assertUser().assertInventory().addItem(true);
  return await db.create<Item>(id, item);
};

export const readItem = async (rowId: RowId): Promise<Item & MetaModelType> => {
  const id = rowId.assertUser().assertInventory().assertItem(true);
  const data = await db.read(id);
  return MetaModelSchema.merge(ItemSchema).parse(data.Item);
};

export const updateItem = async (rowId: RowId, item: Partial<Item>) => {
  const id = rowId.assertUser().assertInventory().assertItem(true);
  return await db.update(id, item);
};

export const deleteItem = async (rowId: RowId) => {
  const id = rowId.assertUser().assertInventory().assertItem(true);
  // TODO: Check that the rowId is healthy and actually points to an item
  return await db.delete(id);
};
