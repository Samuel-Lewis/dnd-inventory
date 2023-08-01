import { Rarity } from "~/api/models/common";

export const rarityToColor: Record<Rarity, string> = {
  varies: "gray",
  common: "gray",
  uncommon: "green",
  rare: "blue",
  "very rare": "violet",
  legendary: "yellow",
  artifact: "orange",
};
