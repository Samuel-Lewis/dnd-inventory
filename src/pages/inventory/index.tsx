import Link from "next/link";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { Paper, Table, Title } from "@mantine/core";
import { DebugPanel } from "@samuel-lewis/components";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { useLocalUser } from "~/hooks/useLocalUser";

const InventoryIndexPage: React.FC = () => {
  const { localUser } = useLocalUser();

  const [inventories] = useCollection(
    inventoryConnection.ownedInventoriesQuery(localUser?.ref),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {/* isLoading: {isLoading.toString()} */}
      <br />
      {/* isError: {isError.toString()} */}
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Items Count</th>
            <th>Owner</th>
            <th>Members</th>
          </tr>
        </thead>
        {inventories?.docs.map((inventory) => {
          return (
            <tr key={inventory.id}>
              <td>
                <Link href={`/inventory/${inventory.id}`}>
                  {inventory.data().name}
                </Link>
              </td>
              <td>{inventory.data().description}</td>
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
    </div>
  );
};

export default InventoryIndexPage;
