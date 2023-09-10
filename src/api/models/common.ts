import { z } from "zod";

import {
  INVENTORY_KEY,
  ITEM_KEY,
  PARTITION_KEY,
  SORT_KEY,
  USER_KEY,
} from "../aws/dynamodb/common";

export const AccessEnum = z.enum(["public", "protected", "private"]);
export const RarityEnum = z.enum([
  "varies",
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
  "artifact",
]);

export type AccessType = z.infer<typeof AccessEnum>;
export type Rarity = z.infer<typeof RarityEnum>;

export const MetaModelSchema = z.object({
  [PARTITION_KEY]: z.string(),
  [SORT_KEY]: z.string(),
  [USER_KEY]: z.string(),
  [INVENTORY_KEY]: z.string().optional(),
  [ITEM_KEY]: z.string().optional(),
  dateCreated: z.number(), // time since epoch
  dateUpdated: z.number(),
  access: AccessEnum,
});
export type MetaModelType = z.infer<typeof MetaModelSchema>;
