import localFont from "next/font/local";
import React from "react";

import { createStyles, MantineSize, Title } from "@mantine/core";

const goudyFont = localFont({ src: "./goudy.ttf" });

export interface GlobalTitleProps {
  size?: MantineSize | string | number;
}

const useStyles = createStyles(() => ({
  title: {
    fontFamily: "Goudy",
    fontWeight: "lighter",
  },
}));

export const GlobalTitle: React.FC<GlobalTitleProps> = ({ size = "3rem" }) => {
  const { classes, cx } = useStyles();
  return (
    <Title size={size} className={cx(goudyFont.className, classes.title)}>
      Party Packrat
    </Title>
  );
};
