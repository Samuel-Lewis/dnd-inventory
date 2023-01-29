import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Paper, Title } from "@mantine/core";

import { ConnectionReturn } from "~/api/firebase/firestore/connection";
import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { Inventory } from "~/api/firebase/models/Inventory";

interface InventoryIdPageProps {
  inventory?: ConnectionReturn<Inventory>;
}

const InventoryIdPage: React.FC<InventoryIdPageProps> = ({ inventory }) => {
  const router = useRouter();
  const { id } = router.query;

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

export const getServerSideProps: GetServerSideProps<
  InventoryIdPageProps
> = async (context) => {
  const { id } = context.query;

  if (typeof id !== "string") {
    return { props: {} };
  }

  const inventory = await inventoryConnection.getDoc(id);

  return {
    props: {
      inventory: inventory ?? undefined,
    },
  };
};
