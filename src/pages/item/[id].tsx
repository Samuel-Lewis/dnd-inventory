import { useRouter } from "next/router";
import React from "react";
import { useCollectionOnce, useDocument } from "react-firebase-hooks/firestore";

import { Box } from "@mantine/core";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { itemConnection } from "~/api/firebase/firestore/item";
import { HydratedInventoryItemEntry } from "~/api/models/Inventory";
import { InventoryQuickAdd } from "~/components/InventoryQuickAdd";
import { ItemCard } from "~/components/ItemIndex/ItemCard";

const ItemIdPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, itemLoading, itemError] = useDocument(
    itemConnection.getDoc(id as string)
  );
  const [inventories] = useCollectionOnce(
    inventoryConnection.recentInventoriesQuery()
  );

  if (typeof id !== "string" || itemLoading || itemError) {
    return null;
  }

  const data = item?.data();
  if (!data || !item?.ref || !item) {
    return null;
  }

  const inventoryItem: HydratedInventoryItemEntry = {
    itemRef: item?.ref,
    item: {
      ref: item?.ref,
      data: data,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO
      // Convert QueryDocumentSnapshot to DocumentSnapshot
      snap: item,
    },
    notes: "",
  };

  return (
    <Box sx={{ height: "100%" }}>
      <ItemCard
        inventoryItem={inventoryItem}
        fullSize
        renderSideElement={(item) => (
          <InventoryQuickAdd item={item} inventories={inventories} />
        )}
      />
    </Box>
  );
};

export default ItemIdPage;
