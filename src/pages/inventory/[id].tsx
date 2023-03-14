import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Button, Stack, Title, Text } from "@mantine/core";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { InventoryItemEntry } from "~/api/models/Inventory";
import { IncrementNumber } from "~/components/IncrementNumber";
import { ItemIndex } from "~/components/ItemIndex";
import { LoadingBlock } from "~/components/LoadingBlock";
import { addItemModalFactory } from "~/components/modals";

const InventoryIdPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inventory, inventoryLoading, inventoryError] = useDocument(
    inventoryConnection.getDoc(id as string)
  );

  const handleAddItem = useCallback(
    (newItems: InventoryItemEntry[]) => {
      if (!inventory || !inventory.id) {
        return;
      }

      const newItem: InventoryItemEntry = {
        itemRef: newItems[0].itemRef,
        quantity: 1,
      };
      inventoryConnection.addItem(inventory.id, newItem);
    },
    [inventory]
  );

  const handleChangeItemCount = useCallback(
    (item: InventoryItemEntry, newCount?: number) => {
      if (!inventory || !inventory.id || newCount === undefined) {
        return;
      }

      inventoryConnection.updateItemQuantity(
        inventory,
        item.subKey ?? "",
        newCount
      );
    },
    [inventory]
  );

  if (!inventory || inventoryLoading || inventoryError) {
    return <LoadingBlock isLoading height={400} />;
  }

  return (
    <Stack sx={{ height: "100%" }}>
      <Title>{inventory.data()?.name}</Title>
      <Text>
        There are {inventory.data()?.items.length} items in the inventory.
      </Text>
      <Text>{inventory.data()?.description}</Text>
      <Button
        onClick={addItemModalFactory({
          onConfirm: handleAddItem,
        })}
      >
        Add item
      </Button>
      <ItemIndex
        loading={inventoryLoading}
        inventoryItems={inventory.data()?.items ?? []}
        renderSideElement={(item) => (
          <IncrementNumber
            value={item.quantity}
            min={0}
            onChange={(v) => handleChangeItemCount(item, v)}
          />
        )}
      />
    </Stack>
  );
};

export default InventoryIdPage;
