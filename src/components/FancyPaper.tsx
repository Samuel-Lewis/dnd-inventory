import React from "react";

import {
  createStyles,
  Paper,
  PaperProps,
  useMantineTheme,
} from "@mantine/core";

import { Rarity } from "~/api/firebase/models/Item";
import {
  FancyBorder00,
  FancyBorder02,
  FancyBorder03,
  FancyBorder12,
  FancyBorder14,
} from "~/lib/category/borders";

const USE_COLOR = true;
const USE_BORDERS = true;
const OFFSET = -6;

export interface FancyPaperProps extends PaperProps {
  children: React.ReactNode;
  rarity?: Rarity;
}

const useStyles = createStyles((theme, { color }: { color: string }) => ({
  frame: {
    position: "relative",
    borderColor: theme.colors[color][6],
  },
  corner: {
    width: 30,
    height: 30,
    position: "absolute",

    "&:nth-child(1)": {
      transform: "rotate(0deg)",
      top: OFFSET,
      left: OFFSET,
    },

    "&:nth-child(2)": {
      transform: "rotate(90deg)",
      top: OFFSET,
      right: OFFSET,
    },

    "&:nth-child(3)": {
      transform: "rotate(180deg)",
      bottom: OFFSET,
      right: OFFSET,
    },

    "&:nth-child(4)": {
      transform: "rotate(270deg)",
      bottom: OFFSET,
      left: OFFSET,
    },
  },
}));

const rarityToBorder = {
  varies: undefined,
  common: undefined,
  uncommon: FancyBorder12,
  rare: FancyBorder02,
  "very rare": FancyBorder03,
  legendary: FancyBorder14,
  artifact: FancyBorder00,
};

const rarityToColor: Record<Rarity, string> = {
  varies: "gray",
  common: "gray",
  uncommon: "green",
  rare: "blue",
  "very rare": "violet",
  legendary: "yellow",
  artifact: "orange",
};

export const FancyPaper: React.FC<FancyPaperProps> = ({
  children,
  rarity = "common",
  ...rest
}) => {
  const color = USE_COLOR ? rarityToColor[rarity] : "gray";
  const { classes } = useStyles({ color });
  const theme = useMantineTheme();

  const currentColor = theme.colors[color][6];
  const Border = rarityToBorder[rarity];

  return (
    <Paper m="sm" p="sm" px="md" withBorder className={classes.frame} {...rest}>
      {USE_BORDERS && rarity && Border && (
        <>
          <Border className={classes.corner} fill={currentColor} />
          <Border className={classes.corner} fill={currentColor} />
          <Border className={classes.corner} fill={currentColor} />
          <Border className={classes.corner} fill={currentColor} />
        </>
      )}
      {children}
    </Paper>
  );
};
