import Image from "next/image";
import React from "react";

import { Group, Text, Tooltip } from "@mantine/core";

import { itemCategories } from "~/api/firebase/category";
import { ItemCategory } from "~/api/firebase/models/Item";

export interface CategoryProps {
  category: ItemCategory;
  compact?: boolean;
}

export const Category: React.FC<CategoryProps> = ({ category, compact }) => {
  const { name } = itemCategories[category];

  const img = (
    <Image src={`/icons/${category}.svg`} alt="" width={20} height={20} />
  );

  if (compact) {
    return <Tooltip label={name}>{img}</Tooltip>;
  }

  return (
    <Group noWrap spacing="xs">
      <Image src={`/icons/${category}.svg`} alt="" width={20} height={20} />
      <Text sx={{ whiteSpace: "nowrap" }}>{name}</Text>
    </Group>
  );
};
