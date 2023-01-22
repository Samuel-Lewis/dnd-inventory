import React from "react";

import { Paper, Title } from "@mantine/core";

const LogoutPage: React.FC = () => {
  console.log("logout");
  return (
    <div>
      <h1>LogoutPage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>Trigger logout and a thank you or something</li>
        </ul>
      </Paper>
    </div>
  );
};

export default LogoutPage;
