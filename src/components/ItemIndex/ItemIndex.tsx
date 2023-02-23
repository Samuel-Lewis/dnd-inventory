import Fuse from "fuse.js";
import React, { ComponentProps, useEffect, useMemo } from "react";

import { Paper, ScrollArea, Stack, TextInput } from "@mantine/core";

import { ConnectionReturn, nonNull } from "~/api/firebase/firestore/connection";
import { itemConnection } from "~/api/firebase/firestore/item";
import {
  InventoryItemEntry,
  HydratedInventoryItemEntry,
} from "~/api/firebase/models/Inventory";
import { Item, ItemRef } from "~/api/firebase/models/Item";
import { fuseOptions } from "~/lib/fuse";

import { ItemCard } from "./ItemCard";

export interface ItemIndexProps {
  inventoryItems: {
    itemRef: ItemRef;
    item?: ConnectionReturn<Item>;
    invItem?: InventoryItemEntry;
  }[];
  renderItemCard?: (item: HydratedInventoryItemEntry) => React.ReactNode;
  maxHeight?: ComponentProps<typeof ScrollArea.Autosize>["maxHeight"];
}

export const ItemIndex: React.FC<ItemIndexProps> = ({
  inventoryItems = [],
}) => {
  const [hydratedItems, setHydratedItems] = React.useState<
    HydratedInventoryItemEntry[]
  >([]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const fuse = useMemo(
    () => new Fuse(hydratedItems, fuseOptions),
    [hydratedItems]
  );

  useEffect(() => {
    Promise.all(
      inventoryItems.map(async ({ itemRef, item, invItem }) => {
        if (item) {
          return {
            itemRef,
            item,
            invItem,
          };
        }

        const hydratedItem = await itemConnection.hydrateRef(itemRef);
        if (!hydratedItem) {
          return null;
        }

        return {
          itemRef,
          item: hydratedItem,
          invItem,
        };
      })
    ).then((i) => {
      const list = i.filter(nonNull).map((i) => ({
        ...i,
        quantity: i.invItem?.quantity ?? -1,
        notes: i.invItem?.notes,
      }));

      setHydratedItems(list);
    });
  }, [inventoryItems]);

  const searchList = useMemo(() => {
    if (!searchTerm) {
      return hydratedItems;
    }

    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse, hydratedItems]);

  return (
    <Stack spacing="xs">
      <Paper p="sm" sx={{ position: "sticky", top: 0, zIndex: 100 }}>
        <TextInput
          label="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
      </Paper>
      <ScrollArea.Autosize maxHeight={"50%"}>
        {searchList.map((item) => (
          <ItemCard inventoryItem={item} key={item.itemRef.id} />
        ))}
      </ScrollArea.Autosize>
    </Stack>
  );
};
