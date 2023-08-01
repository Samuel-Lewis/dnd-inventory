import { DocumentReference } from "firebase/firestore";
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type UserKey = string;
export type UserRef = DocumentReference<User>;
export const UserRefSchema = z.custom<UserRef>((v) => {
  return v instanceof DocumentReference<User>;
});
