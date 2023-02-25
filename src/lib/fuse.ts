import Fuse from "fuse.js";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";

export const fuseOptions: Fuse.IFuseOptions<HydratedInventoryItemEntry> = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: [
    { name: "notes", weight: 1 },
    { name: "item.data.category", weight: 1.5 },
    { name: "item.data.name", weight: 2 },
    // { name: "item.data.visibility", weight: 1 },
    { name: "item.data.description", weight: 1 },
    // { name: "item.data.weight", weight: 1 },
    // { name: "item.data.value", weight: 1 },
    { name: "item.data.srdRefSlug", weight: 1.5 },
    // { name: "item.data.series", weight: 1 },
    // { name: "item.data.rarity", weight: 1 },
  ],
};
