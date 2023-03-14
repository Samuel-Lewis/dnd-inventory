import { Text, Stack, Group, createStyles } from "@mantine/core";

import { GlobalTitle } from "~/components/GlobalTitle";
import { NavButton } from "~/components/NavButton";

import HomeParty from "../../public/home_party.png";

const useStyles = createStyles(() => ({
  bigImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    opacity: 0.2,
    maxWidth: 600,
    width: "80%",
    objectFit: "contain",
  },
}));

export default function IndexPage() {
  const { classes } = useStyles();
  return (
    <Stack align="center" m="xl" p="xl">
      <GlobalTitle />
      <Text>
        This is a pretty simple web app used to track inventories in your
        tabletop RPG games. This is predominately designed for Dungeons and
        Dragons 5th Edition, and has some pre-populated items from the System
        Reference Document.
      </Text>

      <Group>
        <NavButton href="/item">Items</NavButton>
        <NavButton href="/inventory">Inventories</NavButton>
      </Group>
      <img src={HomeParty.src} className={classes.bigImage} alt="" />
    </Stack>
  );
}
