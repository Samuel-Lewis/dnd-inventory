import { DocumentReference } from "firebase/firestore";

import { UserRef } from "./User";

export type SeriesKey = string;
export type SeriesRef = DocumentReference<Series>;

export interface Series {
  name: string;
  owner: UserRef;
  visibility: "public" | "protected" | "private";
  description?: string;
}
