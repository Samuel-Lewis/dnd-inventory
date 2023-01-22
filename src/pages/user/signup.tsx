import React from "react";

import { Paper, Title } from "@mantine/core";

const SignupPage: React.FC = () => {
  console.log("signup");
  return (
    <div>
      <h1>SignUp Page</h1>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>Add different auth providers</li>
        </ul>
      </Paper>
    </div>
  );
};

export default SignupPage;
