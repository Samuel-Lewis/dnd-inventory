import { Button, Paper, Stack, Title } from "@mantine/core";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { itemConnection } from "~/api/firebase/firestore/item";
import { useLocalUserStore } from "~/context/localUserStore";

export default function IndexPage() {
  const localUser = useLocalUserStore((state) => state.userRef);

  const handleClick = async () => {
    if (!localUser) {
      return;
    }
    console.log("click");

    const sword = await itemConnection.create({
      name: "Sword",
      weight: 0,
      description: "A sword",
      value: 10,
      owner: localUser,
      srdRefSlug: "longsword",
      visibility: "public",
    });

    inventoryConnection.create({
      name: "Test",
      description: "Test",
      items: [{ ref: sword, quantity: 1 }],
      owner: localUser,
      members: [localUser],
    });
  };

  return (
    <Stack>
      <Button onClick={handleClick}>Create</Button>

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
