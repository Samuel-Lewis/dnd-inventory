import { DocumentReference } from "firebase/firestore";

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

export interface Item {
  name: string;
  owner: UserRef;
  visibility: "public" | "protected" | "private";
  description?: string;
  weight?: number;
  value?: number;
  srdRefSlug?: string;
  series?: SeriesRef;
  rarity?: Rarity;
}
