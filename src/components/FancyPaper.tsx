import React from "react";

import {
  Box,
  createStyles,
  Paper,
  PaperProps,
  useMantineTheme,
} from "@mantine/core";

import { Rarity } from "~/api/models/common";
import {
  FancyBorder00,
  FancyBorder02,
  FancyBorder06,
  FancyBorder14,
  FancyBorder17,
} from "~/lib/category/borders";

// TODO: Need to fix styles to enable colors without fancy borders
const USE_COLOR = true;
const USE_BORDERS = true;
const BORDER_SIZE = "2px";

export interface FancyPaperProps extends PaperProps {
  children: React.ReactNode;
  rarity?: Rarity;
}

const useStyles = createStyles(
  (
    _,
    {
      currentColor = "gray",
      marginSize = 0,
      offset = 0,
    }: {
      currentColor: string;
      marginSize?: number;
      offset?: number;
    }
  ) => {
    return {
      children: {
        pointerEvents: "auto",
      },
      frame: {
        position: "relative",
        border: 0,
        pointerEvents: "none",

        ":before": {
          boxShadow: `-1px 0 0 ${currentColor}, 1px 0 0 ${currentColor}`,
          width: `calc(100% - ${BORDER_SIZE} / 2)`,
          height: `calc(100% - ${marginSize}px * 2 - ${BORDER_SIZE})`,
          content: "''",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          margin: "auto",
        },

        ":after": {
          boxShadow: `0 -1px 0 ${currentColor}, 0 1px 0 ${currentColor}`,
          height: `calc(100% - ${BORDER_SIZE} / 2)`,
          width: `calc(100% - ${marginSize}px * 2 - ${BORDER_SIZE})`,
          content: "''",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
        },
      },
      corner: {
        width: 30,
        height: 30,
        position: "absolute",
        pointerEvents: "none",
        overflow: "visible",

        "&:nth-of-type(1)": {
          transform: "rotate(0deg)",
          top: -offset,
          left: -offset,
        },

        "&:nth-of-type(2)": {
          transform: "rotate(90deg)",
          top: -offset,
          right: -offset,
        },

        "&:nth-of-type(3)": {
          transform: "rotate(180deg)",
          bottom: -offset,
          right: -offset,
        },

        "&:nth-of-type(4)": {
          transform: "rotate(270deg)",
          bottom: -offset,
          left: -offset,
        },
      },
    };
  }
);

const rarityToBorder = {
  varies: undefined,
  common: undefined,
  uncommon: FancyBorder02,
  rare: FancyBorder06,
  "very rare": FancyBorder17,
  legendary: FancyBorder14,
  artifact: FancyBorder00,
};

const rarityStyles: Record<
  Rarity,
  {
    colorName: string;
    offset?: number;
    marginSize?: number;
    useFancy?: boolean;
  }
> = {
  varies: { colorName: "gray" },
  common: { colorName: "gray" },
  uncommon: { colorName: "green", useFancy: true, offset: 5, marginSize: 14 },
  rare: { colorName: "blue", useFancy: true, offset: 3.5, marginSize: 8 },
  "very rare": {
    colorName: "violet",
    useFancy: true,
    offset: 3,
    marginSize: 18,
  },
  legendary: {
    colorName: "yellow",
    useFancy: true,
    offset: 2,
    marginSize: 30,
  },
  artifact: { colorName: "orange", useFancy: true, offset: 6, marginSize: 26 },
};

export const FancyPaper: React.FC<FancyPaperProps> = ({
  children,
  rarity = "common",
  ...rest
}) => {
  const theme = useMantineTheme();
  const styles = rarityStyles[rarity];
  const colorName = USE_COLOR ? styles.colorName : "gray";
  const useFancy = USE_BORDERS && styles.useFancy;

  const currentColor = theme.colors[colorName][6];
  const { classes, cx } = useStyles({ currentColor, ...styles });

  const Border = rarityToBorder[rarity];

  return (
    <Paper
      m="xs"
      p="md"
      withBorder
      className={cx({ [classes.frame]: useFancy })}
      {...rest}
    >
      {useFancy && Border && (
        <>
          <Border className={classes.corner} fill={currentColor} />
          <Border className={classes.corner} fill={currentColor} />
          <Border className={classes.corner} fill={currentColor} />
          <Border className={classes.corner} fill={currentColor} />
        </>
      )}
      <Box className={classes.children}>{children}</Box>
    </Paper>
  );
};
