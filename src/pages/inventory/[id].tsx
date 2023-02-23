import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Button, Stack, Title } from "@mantine/core";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { ItemIndex } from "~/components/ItemIndex";
import { addItemModalFactory } from "~/components/modals";

const InventoryIdPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [inventory, inventoryLoading, inventoryError] = useDocument(
    inventoryConnection.getDoc(id as string)
  );

  if (!inventory || inventoryLoading || inventoryError) {
    return <div>Not found</div>;
  }

  return (
    <Stack>
      <Title>{inventory.data()?.name}</Title>
      There are {inventory.data()?.items.length} items in the inventory
      <ItemIndex inventoryItems={inventory.data()?.items ?? []} />
      <Button
        onClick={addItemModalFactory({
          onConfirm: () => [],
        })}
      >
        Add item
      </Button>
    </Stack>
  );
};

export default InventoryIdPage;
