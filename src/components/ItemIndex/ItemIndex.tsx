import Fuse from "fuse.js";
import React, { ComponentProps, useEffect, useMemo } from "react";

import { Box, ScrollArea, Stack, TextInput } from "@mantine/core";

import { nonNull } from "~/api/firebase/firestore/connection";
import { itemConnection } from "~/api/firebase/firestore/item";
import { HydratedInventoryItemEntry } from "~/api/models/Inventory";
import { fuseOptions } from "~/lib/fuse";

import { ItemCard } from "./ItemCard";

export interface ItemIndexProps {
  inventoryItems: HydratedInventoryItemEntry[];
  renderSideElement?: (item: HydratedInventoryItemEntry) => React.ReactNode;
  maxHeight?: ComponentProps<typeof ScrollArea.Autosize>["maxHeight"];
}

export const ItemIndex: React.FC<ItemIndexProps> = ({
  inventoryItems = [],
  renderSideElement,
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
      inventoryItems.map(async ({ itemRef, item, ...rest }) => {
        if (item) {
          return {
            itemRef,
            item,
            ...rest,
          };
        }

        const hydratedItem = await itemConnection.hydrateRef(itemRef);
        if (!hydratedItem) {
          return null;
        }

        return {
          itemRef,
          item: hydratedItem,
          ...rest,
        };
      })
    ).then((i) => {
      const list = i.filter(nonNull);
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
    <Stack spacing="xs" sx={{ flex: "1 0", minHeight: 0, height: "100%" }}>
      <Box>
        <TextInput
          label="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
      </Box>

      <ScrollArea offsetScrollbars>
        {searchList.map((item) => (
          <ItemCard
            inventoryItem={item}
            key={item.itemRef.id}
            renderSideElement={renderSideElement}
          />
        ))}
      </ScrollArea>
    </Stack>
  );
};
