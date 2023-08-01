import { z } from "zod";

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
