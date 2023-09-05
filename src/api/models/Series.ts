import { DocumentReference } from "firebase/firestore";
import { z } from "zod";

import { seriesConnection } from "../firebase/firestore/series";

import { referenceSchemaFactory, VisibilityEnum } from "./common";
import { UserRefSchema } from "./User";

export const SeriesSchema = z.object({
  name: z.string(),
  ownerRef: UserRefSchema,
  visibility: VisibilityEnum,
  description: z.string().optional(),
});

export type Series = z.infer<typeof SeriesSchema>;
export type SeriesKey = string;
export type SeriesRef = DocumentReference<Series>;
export const SeriesRefSchema = referenceSchemaFactory<Series>(seriesConnection);
export const SeriesTableKey = "series";
