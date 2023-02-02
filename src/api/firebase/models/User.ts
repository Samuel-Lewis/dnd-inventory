import { DocumentReference } from "firebase/firestore";

import { DocMeta } from "./Meta";

export type UserKey = string;
export type UserRef = DocumentReference<User>;

export interface User extends DocMeta {
  name: string;
}

export interface UserTable {
  [userId: UserKey]: User;
}
