import Link from "next/link";
import React from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import { Paper, Table, Title } from "@mantine/core";
import { DebugPanel } from "@samuel-lewis/components";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { useLocalUser } from "~/hooks/useLocalUser";

const InventoryIndexPage: React.FC = () => {
  const { localUser } = useLocalUser();

  const [inventories] = useCollectionOnce(
    inventoryConnection.ownedInventoriesQuery(localUser?.ref)
  );

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Total Items</th>
            <th>Unique Items</th>
            <th>Owner</th>
            <th>Members</th>
          </tr>
        </thead>
        {inventories?.docs.map((inventory) => {
          const totalItems = inventory
            .data()
            .items.reduce((acc, item) => acc + item.quantity, 0);

          return (
            <tr key={inventory.id}>
              <td>
                <Link href={`/inventory/${inventory.id}`}>
                  {inventory.data().name}
                </Link>
              </td>
              <td>{inventory.data().description}</td>
              <td>{totalItems}</td>
              <td>{inventory.data().items.length}</td>
              <td>{/* inventory.data().owner */} owner</td>
              <td>{inventory.data().members.length}</td>
            </tr>
          );
        })}
      </Table>
      <DebugPanel title="Inventory" debugMode>
        <pre>{JSON.stringify(inventories?.docs, null, 2)}</pre>
      </DebugPanel>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>List of your own inventories</li>
          <li>Potentially a list of public or friends inventories?</li>
        </ul>
      </Paper>
    </>
  );
};

export default InventoryIndexPage;
