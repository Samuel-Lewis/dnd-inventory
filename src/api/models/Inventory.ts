import { z } from "zod";

export const InventorySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type Inventory = z.infer<typeof InventorySchema>;
