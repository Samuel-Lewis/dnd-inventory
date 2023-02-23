import { ConnectionReturn } from "../firestore/connection";

import { Item, ItemRef } from "./Item";
import { UserRef } from "./User";

export type InventoryKey = string;

export type InventoryItemEntry = {
  itemRef: ItemRef;
  quantity: number;
  notes?: string;
};

export type HydratedInventoryItemEntry = InventoryItemEntry & {
  item: ConnectionReturn<Item> | null;
};

export interface Inventory {
  name: string;
  description?: string;
  items: InventoryItemEntry[];
  owner: UserRef;
  members: UserRef[];
}
