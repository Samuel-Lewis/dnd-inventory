import {
  DocumentData,
  DocumentReference,
  WithFieldValue,
} from "firebase/firestore";
import { z } from "zod";

import { FirestoreConnection } from "../firebase/firestore/connection";

export const VisibilityEnum = z.enum(["public", "protected", "private"]);
export type VisibilityType = z.infer<typeof VisibilityEnum>;

export const RarityEnum = z.enum([
  "varies",
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
  "artifact",
]);
export type Rarity = z.infer<typeof RarityEnum>;

export const referenceSchemaFactory = <T extends WithFieldValue<DocumentData>>(
  connection: FirestoreConnection<T>
) =>
  z
    .custom<DocumentReference<T>>((v) => v instanceof DocumentReference<T>)
    .or(z.string().transform((v) => connection.pathToReference(v)));
