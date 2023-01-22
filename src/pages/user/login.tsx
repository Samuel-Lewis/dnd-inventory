import React from "react";

import { Paper, Title } from "@mantine/core";

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>LoginPage</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>Add different auth providers</li>
        </ul>
      </Paper>
    </div>
  );
};

export default LoginPage;
