import { ItemRef } from "./Item";
import { DocMeta } from "./Meta";
import { UserRef } from "./User";

export type InventoryKey = string;

export interface Inventory extends DocMeta {
  name: string;
  description: string;
  items: { ref: ItemRef; quantity: number }[];
  owner: UserRef;
  members: UserRef[];
}
