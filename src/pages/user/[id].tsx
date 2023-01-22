import React from "react";

import { Paper, Title } from "@mantine/core";

const UserIdPage: React.FC = () => {
  console.log("user id");
  return (
    <div>
      <h1>UserIdPage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>Public view of your page</li>
          <li>Public listed items</li>
          <li>Public inventories</li>
          <li>About me?</li>
        </ul>
      </Paper>
    </div>
  );
};

export default UserIdPage;
