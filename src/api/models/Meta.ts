import { FieldValue, Timestamp } from "firebase/firestore";

export type DocMeta = {
  createdAt: Timestamp;
  updatedAt: FieldValue;
};
