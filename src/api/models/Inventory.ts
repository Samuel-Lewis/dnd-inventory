import { ConnectionReturn } from "../firebase/firestore/connection";

import { Item, ItemRef } from "./Item";
import { UserRef } from "./User";

export type InventoryKey = string;

export type InventoryItemEntry = {
  itemRef: ItemRef;
  quantity: number;
  notes?: string;
};

export type HydratedInventoryItemEntry = InventoryItemEntry & {
  item?: ConnectionReturn<Item>;
};

export interface Inventory {
  name: string;
  description?: string;
  items: InventoryItemEntry[];
  owner: UserRef;
  members: UserRef[];
}
