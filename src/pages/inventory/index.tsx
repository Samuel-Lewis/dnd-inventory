import React from "react";

import { Paper, Title } from "@mantine/core";

const InventoryIndexPage: React.FC = () => {
  return (
    <div>
      <h1>InventoryIndexPage</h1>
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
