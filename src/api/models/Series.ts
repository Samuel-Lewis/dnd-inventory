import { DocumentReference } from "firebase/firestore";
import { z } from "zod";

import { VisibilityEnum } from "./common";
import { UserRefSchema } from "./User";

export const SeriesSchema = z.object({
  name: z.string(),
  owner: UserRefSchema,
  visibility: VisibilityEnum,
  description: z.string().optional(),
});

export type Series = z.infer<typeof SeriesSchema>;
export type SeriesKey = string;
export type SeriesRef = DocumentReference<Series>;
export const SeriesRefSchema = z.custom<SeriesRef>((v) => {
  return v instanceof DocumentReference<Series>;
});
