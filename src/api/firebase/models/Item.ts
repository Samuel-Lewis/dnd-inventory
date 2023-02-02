import { DocumentReference } from "firebase/firestore";

import { DocMeta } from "./Meta";
import { SeriesKey } from "./Series";
import { UserRef } from "./User";

export type ItemKey = string;
export type ItemRef = DocumentReference<Item>;

export interface Item extends DocMeta {
  name: string;
  weight: number;
  description: string;
  value: number;
  srdRefSlug: string;
  owner: UserRef;
  series?: SeriesKey;
  visibility: "public" | "protected" | "private";
}
