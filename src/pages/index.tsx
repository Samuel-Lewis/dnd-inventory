import { Button, Group, Stack, useMantineTheme } from "@mantine/core";

import { FancyPaper } from "~/components/FancyPaper";
import { addItemModalFactory } from "~/components/modals";

export default function IndexPage() {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Group>
        {Object.keys(theme.colors).map((color) => (
          <Button
            key={color}
            color={color}
            onClick={addItemModalFactory({
              onConfirm: () => [],
            })}
          >
            {color}
          </Button>
        ))}
      </Group>
      <Stack sx={{ width: 600 }}>
        <FancyPaper rarity="varies">This is a varied rarity item.</FancyPaper>
        <FancyPaper rarity="common">This is a common rarity item.</FancyPaper>
        <FancyPaper rarity="uncommon">
          This is a uncommon rarity item.
        </FancyPaper>
        <FancyPaper rarity="rare">This is a rare rarity item.</FancyPaper>
        <FancyPaper rarity="very rare">
          This is a very rare rarity item.
        </FancyPaper>
        <FancyPaper rarity="legendary">
          This is a legendary rarity item.
        </FancyPaper>
        <FancyPaper rarity="artifact">
          This is a artifact rarity item.
        </FancyPaper>
      </Stack>
    </Stack>
  );
}
