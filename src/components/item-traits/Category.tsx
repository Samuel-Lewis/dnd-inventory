import React from "react";

import { createStyles, Group, Text, Tooltip } from "@mantine/core";

import { ItemCategory } from "~/api/models/Item";
import { itemCategories } from "~/lib/category/category";

export interface CategoryTraitProps {
  category?: ItemCategory;
  useIcon?: boolean;
  useLabel?: boolean;
  useTooltip?: boolean;
  iconSize?: number;
}

const useStyles = createStyles((theme) => ({
  icon: {
    path: {
      fill: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export const CategoryTrait: React.FC<CategoryTraitProps> = ({
  category,
  useIcon = true,
  useLabel = true,
  useTooltip = false,
  iconSize = 20,
}) => {
  const { classes } = useStyles();
  if (!category) {
    return null;
  }
  const { name, Icon } = itemCategories[category];

  const body = (
    <Group noWrap spacing="xs">
      {useIcon && (
        <Icon
          style={{ height: iconSize, width: iconSize }}
          className={classes.icon}
        />
      )}
      {useLabel && <Text sx={{ whiteSpace: "nowrap" }}>{name}</Text>}
    </Group>
  );

  if (useTooltip) {
    return <Tooltip label={name}>{body}</Tooltip>;
  }

  return body;
};
