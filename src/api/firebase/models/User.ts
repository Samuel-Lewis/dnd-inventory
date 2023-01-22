import { DocumentReference } from "firebase/firestore";

export type UserKey = string;
export type UserRef = DocumentReference<User>;

export interface User {
  name: string;
}

export interface UserTable {
  [userId: UserKey]: User;
}
