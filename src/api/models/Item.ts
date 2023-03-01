import { DocumentReference } from "firebase/firestore";

import { itemCategories } from "~/lib/category/category";

import { SeriesRef } from "./Series";
import { UserRef } from "./User";

export type ItemKey = string;
export type ItemRef = DocumentReference<Item>;

export type Rarity =
  | "varies"
  | "common"
  | "uncommon"
  | "rare"
  | "very rare"
  | "legendary"
  | "artifact";

export type ItemCategory = keyof typeof itemCategories;

export interface Item {
  name: string;
  description?: string;
  owner: UserRef;
  visibility: "public" | "protected" | "private";
  srdRefSlug?: string;
  series?: SeriesRef;
  category: ItemCategory;
  weight?: number;
  value?: number;
  rarity?: Rarity;
}
