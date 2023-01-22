import React from "react";

import { Paper, Title } from "@mantine/core";

const InventoryCreatePage: React.FC = () => {
  return (
    <div>
      <h1>InventoryCreatePage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>No perms, redirects to signup?</li>
          <li>Form to create inventory</li>
          <li>Optional to immediately add items</li>
        </ul>
      </Paper>
    </div>
  );
};

export default InventoryCreatePage;
