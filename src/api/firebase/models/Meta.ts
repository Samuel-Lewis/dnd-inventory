import { FieldValue } from "firebase/firestore";

export type DocMeta = {
  meta: {
    createdAt: FieldValue;
    updatedAt: FieldValue;
  };
};
