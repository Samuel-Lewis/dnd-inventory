import { DocumentReference } from "firebase/firestore";
import z from "zod";

import { itemCategories } from "~/lib/category/category";

import { RarityEnum, VisibilityEnum } from "./common";
import { SeriesRefSchema } from "./Series";
import { UserRefSchema } from "./User";

const [k1, ...kRest] = Object.keys(itemCategories) as Array<
  keyof typeof itemCategories
>;
export const ItemCategoryEnum = z.enum([k1, ...kRest]);
export type ItemCategory = z.infer<typeof ItemCategoryEnum>;

export const ItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  srdRefSlug: z.string().optional(),
  srd: z.boolean().optional(),
  visibility: VisibilityEnum,
  weight: z.number().optional(),
  value: z.number().optional(),
  rarity: RarityEnum,
  category: ItemCategoryEnum,
  ownerRef: UserRefSchema,
  seriesRef: SeriesRefSchema.optional(),
});

export type Item = z.infer<typeof ItemSchema>;
export type ItemKey = string;
export type ItemRef = DocumentReference<Item>;
// TODO: Some circular dependency issue here??
// export const ItemRefSchema = referenceSchemaFactory<Item>(itemConnection);
export const ItemTableKey = "items";
