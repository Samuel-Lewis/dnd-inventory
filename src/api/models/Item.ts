import z from "zod";

import { itemCategories } from "~/lib/category/category";

import { RarityEnum, AccessEnum } from "./common";

const [k1, ...kRest] = Object.keys(itemCategories) as Array<
  keyof typeof itemCategories
>;
export const ItemCategoryEnum = z.enum([k1, ...kRest]);
export type ItemCategory = z.infer<typeof ItemCategoryEnum>;

export const ItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  srdSlug: z.string().optional(),
  visibility: AccessEnum,
  weight: z.number().optional(),
  value: z.number().optional(),
  rarity: RarityEnum,
  category: ItemCategoryEnum,
});

export type Item = z.infer<typeof ItemSchema>;
