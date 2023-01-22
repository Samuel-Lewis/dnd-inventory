import React from "react";

import { Paper, Title } from "@mantine/core";

const ItemCreatePage: React.FC = () => {
  console.log("item create id");
  return (
    <div>
      <h1>ItemCreatePage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>No perms, redirects to signup?</li>
          <li>Form to create item</li>
          <li>Optional to add to inventory</li>
        </ul>
      </Paper>
    </div>
  );
};

export default ItemCreatePage;
