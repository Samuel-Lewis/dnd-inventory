import React, { useMemo } from "react";

import { Title, Stack, Group } from "@mantine/core";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";
import { ItemIndex } from "~/components/ItemIndex";
import { NavButton } from "~/components/NavButton";
import { useAvailableItems } from "~/hooks/firestore";

const ItemIndexPage: React.FC = () => {
  const [publicItems, loading] = useAvailableItems();

  const transformedItems = useMemo(() => {
    if (!publicItems) {
      return [];
    }

    return publicItems.docs.map((doc) => {
      const data = doc.data();
      const t: HydratedInventoryItemEntry = {
        item: { ref: doc.ref, data, snap: doc },
        itemRef: doc.ref,
        quantity: -1,
      };
      return t;
    });
  }, [publicItems]);

  return (
    <Stack sx={{ height: "100%" }}>
      <Title>All Items</Title>
      <Group>
        <NavButton href="/item/create">Create Item</NavButton>
      </Group>
      <ItemIndex inventoryItems={transformedItems} loading={loading} />
    </Stack>
  );
};

export default ItemIndexPage;
