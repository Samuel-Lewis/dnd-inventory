import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Paper, Title } from "@mantine/core";

import { ConnectionReturn } from "~/api/firebase/firestore/connection";
import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { Inventory } from "~/api/firebase/models/Inventory";

interface InventoryIdPageProps {
  inventory?: ConnectionReturn<Inventory>;
}

const InventoryIdPage: React.FC<InventoryIdPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const [inventory, setInventory] = useState<
    ConnectionReturn<Inventory> | undefined
  >();

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }

    inventoryConnection.getDocValue(id).then((inventory) => {
      setInventory(inventory ?? undefined);
    });
  });

  if (!inventory) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <Title>{inventory.data.name}</Title>
      There are {inventory.data.items.length} items in the inventory
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>{id}</li>
          <li>List of contents in inventory</li>
        </ul>
      </Paper>
    </div>
  );
};

export default InventoryIdPage;
