import React from "react";

import { Paper, Title } from "@mantine/core";

const InventoryIdPage: React.FC = () => {
  console.log("user id");
  return (
    <div>
      <h1>InventoryIdPage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>List of contents in inventory</li>
        </ul>
      </Paper>
    </div>
  );
};

export default InventoryIdPage;
