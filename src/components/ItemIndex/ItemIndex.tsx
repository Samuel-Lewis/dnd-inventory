import Fuse from "fuse.js";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box, Group, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";

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
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [hydratedItems, setHydratedItems] = React.useState<
    HydratedInventoryItemEntry[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");
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

  const rowVirtualizer = useVirtualizer({
    count: searchList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 165,
    overscan: 5,
  });

  return (
    <Stack sx={{ flex: "1 0", minHeight: 0, height: "100%" }} spacing="xs">
      <Group grow mx="xs">
        <TextInput
          label="Search"
          defaultValue={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          disabled={loading}
        />
      </Group>

      <LoadingBlock isLoading={loading}>
        <ScrollArea viewportRef={parentRef}>
          <Box
            sx={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = searchList[virtualRow.index];
              return (
                <Box
                  key={virtualRow.index}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <ItemCard
                    inventoryItem={item}
                    key={item.itemRef.id}
                    renderSideElement={renderSideElement}
                  />
                </Box>
              );
            })}
          </Box>
        </ScrollArea>
      </LoadingBlock>
    </Stack>
  );
};
