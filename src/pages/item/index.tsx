import React from "react";

import { Paper, Title } from "@mantine/core";

const ItemIndexPage: React.FC = () => {
  console.log("item index");
  return (
    <div>
      <h1>ItemIndexPage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>Big ole item search</li>
          <li>List of SRD items</li>
          <li>List of user items</li>
        </ul>
      </Paper>
    </div>
  );
};

export default ItemIndexPage;
