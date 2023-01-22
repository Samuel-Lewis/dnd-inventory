import { DocumentReference } from "firebase/firestore";

import { UserRef } from "./User";

export type ItemKey = string;
export type ItemRef = DocumentReference<Item>;

export type Item = {
  name: string;
  weight: number;
  description: string;
  value: number;
  srdRefSlug: string;
  owner: UserRef;
  visibility: "public" | "protected" | "private";
};
