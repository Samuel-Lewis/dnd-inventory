import { DocumentReference } from "firebase/firestore";
import { z } from "zod";

import { userConnection } from "../firebase/firestore/user";

import { referenceSchemaFactory } from "./common";

export const UserSchema = z.object({
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type UserKey = string;
export type UserRef = DocumentReference<User>;
export const UserRefSchema = referenceSchemaFactory<User>(userConnection);
export const UserTableKey = "users";
