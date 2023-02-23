import React from "react";

import { Box, createStyles, Group, Text, Tooltip } from "@mantine/core";

import { ItemCategory } from "~/api/firebase/models/Item";
import { itemCategories } from "~/lib/category/category";

export interface CategoryProps {
  category?: ItemCategory;
  compact?: boolean;
}

const useStyles = createStyles((theme) => ({
  icon: {
    path: {
      fill: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export const Category: React.FC<CategoryProps> = ({ category, compact }) => {
  const { classes } = useStyles();
  if (!category) {
    return null;
  }
  const { name, Icon } = itemCategories[category];

  if (compact) {
    return (
      <Tooltip label={name}>
        <Box>
          <Icon style={{ height: 20, width: 20 }} className={classes.icon} />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Group noWrap spacing="xs">
      <Icon style={{ height: 20, width: 20 }} className={classes.icon} />
      <Text sx={{ whiteSpace: "nowrap" }}>{name}</Text>
    </Group>
  );
};
