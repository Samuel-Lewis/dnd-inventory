import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Stack } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { HydratedInventoryItemEntry } from "~/api/models/Inventory";
import { ItemCard } from "~/components/ItemIndex/ItemCard";

const ItemIdPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, itemLoading, itemError] = useDocument(
    itemConnection.getDoc(id as string)
  );
  if (typeof id !== "string") {
    console.error("id is not a string", id);
    return null;
  }

  if (itemLoading || itemError) {
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
    <Stack sx={{ height: "100%" }}>
      {/* TODO: Add renderRight to quick add to inventory */}
      <ItemCard inventoryItem={inventoryItem} fullSize />
    </Stack>
  );
};

export default ItemIdPage;
