import { Paper, Stack, Title } from "@mantine/core";

export default function IndexPage() {
  return (
    <Stack>
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>
            List of associated inventories. Links to the given inventories
          </li>
          <li>Info about the project</li>
        </ul>
      </Paper>
    </Stack>
  );
}
