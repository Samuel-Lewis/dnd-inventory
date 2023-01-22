import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Paper, Stack, Title } from "@mantine/core";
import { DebugPanel } from "@samuel-lewis/components";

import { firebase } from "~/api/firebase";

const UserPage: React.FC = () => {
  const [user, _, error] = useAuthState(firebase.auth);

  return (
    <Stack>
      <Title>UserPage</Title>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>User details and settings of currently logged in user</li>
          <li>All inventories</li>
          <li>All items</li>
          <li>Some kind of user configuration?</li>
        </ul>
      </Paper>

      <DebugPanel title="User Auth" debugMode>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </DebugPanel>
      <DebugPanel title="Auth Error" isError={!!error} debugMode>
        {!!error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </DebugPanel>
    </Stack>
  );
};

export default UserPage;
