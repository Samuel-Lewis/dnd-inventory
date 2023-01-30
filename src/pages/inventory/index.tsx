import React from "react";

import { Paper, Title } from "@mantine/core";

import { Inventory } from "~/api/firebase/models/Inventory";

interface InventoryIndexPageProps {
  inventories?: Inventory[];
}

const InventoryIndexPage: React.FC<InventoryIndexPageProps> = ({
  inventories,
}) => {
  if (!inventories) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1>InventoryIndexPage</h1>
      {JSON.stringify(inventories, null, 2)}
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
