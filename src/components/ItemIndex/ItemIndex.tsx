import Fuse from "fuse.js";
import React, { useEffect, useMemo } from "react";

import { Group, ScrollArea, Stack, TextInput } from "@mantine/core";

import { nonNull } from "~/api/firebase/firestore/connection";
import { itemConnection } from "~/api/firebase/firestore/item";
import { HydratedInventoryItemEntry } from "~/api/models/Inventory";
import { fuseOptions } from "~/lib/fuse";

import { LoadingBlock } from "../LoadingBlock";

import { ItemCard } from "./ItemCard";

export interface ItemIndexProps {
  inventoryItems: HydratedInventoryItemEntry[];
  renderSideElement?: (item: HydratedInventoryItemEntry) => React.ReactNode;
  loading?: boolean;
}

export const ItemIndex: React.FC<ItemIndexProps> = ({
  inventoryItems = [],
  renderSideElement,
  loading = false,
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
    <Stack sx={{ flex: "1 0", minHeight: 0, height: "100%" }} spacing="xs">
      <Group grow mx="xs">
        <TextInput
          label="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          disabled={loading}
        />
      </Group>

      <LoadingBlock isLoading={loading}>
        <ScrollArea>
          <Stack spacing={0}>
            {searchList.map((item) => (
              <ItemCard
                inventoryItem={item}
                key={item.itemRef.id}
                renderSideElement={renderSideElement}
              />
            ))}
          </Stack>
        </ScrollArea>
      </LoadingBlock>
    </Stack>
  );
};
