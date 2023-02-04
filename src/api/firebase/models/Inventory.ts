import { ItemRef } from "./Item";
import { UserRef } from "./User";

export type InventoryKey = string;

export interface Inventory {
  name: string;
  description?: string;
  items: { ref: ItemRef; quantity: number; notes?: string }[];
  owner: UserRef;
  members: UserRef[];
}
