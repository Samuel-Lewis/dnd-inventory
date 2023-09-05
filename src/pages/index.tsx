import { Text, Stack, Group, createStyles, Container } from "@mantine/core";

import { FancyPaper } from "~/components/FancyPaper";
import { GlobalTitle } from "~/components/GlobalTitle";
import { NavButton } from "~/components/NavButton";

import HomeParty from "../../public/home_party.png";

const useStyles = createStyles(() => ({
  frame: {
    maxWidth: 900,
  },
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
    <Container className={classes.frame}>
      <FancyPaper rarity="uncommon" m="xl">
        <Stack align="center" p="lg">
          <GlobalTitle />
          <Text>
            <b>Party Packrat</b> is a pretty simple web app used to track
            inventories for your tabletop RPG games. A simplified way to create
            homebrew items and tracks party (or individual) inventories for all
            your campaigns.
          </Text>
          <Text>
            This is predominately designed for Dungeons and Dragons 5th Edition,
            and has some pre-populated items from the System Reference Document.
          </Text>
          <Group>
            <NavButton href="/item">Items</NavButton>
            <NavButton href="/inventory">Inventories</NavButton>
          </Group>
        </Stack>
      </FancyPaper>
      {/* TODO: Make this a proper nextjs image */}
      <img src={HomeParty.src} className={classes.bigImage} alt="" />
    </Container>
  );
}
