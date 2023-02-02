import { DocumentReference } from "firebase/firestore";

import { DocMeta } from "./Meta";
import { UserRef } from "./User";

export type SeriesKey = string;
export type SeriesRef = DocumentReference<Series>;

export interface Series extends DocMeta {
  name: string;
  owner: UserRef;
  visibility: "public" | "protected" | "private";
  description: string;
}
