import { useRouter } from "next/router";
import React from "react";

import {
  createStyles,
  Group,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { TablerIcon } from "@tabler/icons";

import { NavButton } from "../NavButton";

import { LayoutType } from "./types";

export interface FancyNavButtonProps {
  label: string;
  link: string;
  Icon: TablerIcon;
  layout: LayoutType;
}

const useStyles = createStyles(() => ({
  navButton: {
    ".mantine-Button-inner": {
      justifyContent: "start",
    },
  },
}));

export const FancyNavButton: React.FC<FancyNavButtonProps> = ({
  label,
  link,
  layout,
  Icon,
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const lean = layout === LayoutType.COMPACT;
  const style =
    router.asPath === link
      ? "filled"
      : router.asPath.startsWith(link)
      ? "light"
      : "subtle";

  const button = (
    <NavButton
      key={link}
      href={link}
      fullWidth
      variant={style}
      size="lg"
      p={0}
      px="md"
      className={classes.navButton}
    >
      <Group spacing="xs">
        <Icon
          size={24}
          color={
            theme.colorScheme == "dark"
              ? theme.colors.gray[2]
              : theme.colors.dark[9]
          }
        />
        {!lean && <Text size="sm">{label}</Text>}
      </Group>
    </NavButton>
  );

  if (lean) {
    return <Tooltip label={label}>{button}</Tooltip>;
  }
  return button;
};
