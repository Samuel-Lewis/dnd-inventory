import React from "react";

import { Paper, Stack, Title } from "@mantine/core";
import { DebugPanel } from "@samuel-lewis/components";

import { useLocalUser } from "~/hooks/useLocalUser";

const UserPage: React.FC = () => {
  const { localUser, authError, userError } = useLocalUser();

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
        <pre>{JSON.stringify(localUser, null, 2)}</pre>
      </DebugPanel>
      <DebugPanel title="Auth Error" isError={!!authError} debugMode>
        {!!authError && <pre>{JSON.stringify(authError, null, 2)}</pre>}
      </DebugPanel>
      <DebugPanel title="Auth Error" isError={!!userError} debugMode>
        {!!userError && <pre>{JSON.stringify(userError, null, 2)}</pre>}
      </DebugPanel>
    </Stack>
  );
};

export default UserPage;
