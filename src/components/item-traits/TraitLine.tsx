import React from "react";

import { Badge, Divider, Group } from "@mantine/core";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";

import { CategoryTrait } from "./Category";
import { RarityTrait } from "./Rarity";
import { ValueTrait } from "./Value";
import { WeightTrait } from "./Weight";

export interface TraitLineProps {
  inventoryItem: HydratedInventoryItemEntry;
  showCategory?: boolean;
  showRarity?: boolean;
  showValue?: boolean;
  showWeight?: boolean;
  showCache?: boolean;
}

export const TraitLine: React.FC<TraitLineProps> = ({
  inventoryItem,
  showCategory = true,
  showRarity = true,
  showValue = true,
  showWeight = true,
  showCache = false,
}) => {
  const { weight, rarity, value, category } = inventoryItem.item?.data ?? {};
  const { id } = inventoryItem.itemRef;
  const cached = inventoryItem.item?.snap.metadata.fromCache ?? false;
  const parts = [];

  if (showCategory && !!category) {
    parts.push(<CategoryTrait key={`category-${id}`} category={category} />);
  }

  if (showRarity && !!rarity) {
    parts.push(<RarityTrait key={`rarity-${id}`} rarity={rarity} />);
  }

  if (showValue && !!value) {
    parts.push(<ValueTrait key={`value-${id}`} value={value} />);
  }

  if (showWeight && !!weight) {
    parts.push(<WeightTrait key={`weight-${id}`} weight={weight} />);
  }

  if (showCache) {
    parts.push(
      <Badge size="sm" key={`cache-${id}`} color={cached ? "green" : "red"}>
        {cached ? "Cached" : "Server"}
      </Badge>
    );
  }

  return (
    <Group spacing="xs">
      {parts.flatMap((part, index, array) => {
        const parts = [part];

        if (index < array.length - 1) {
          parts.push(
            <Divider
              m={0}
              p={0}
              key={`${part.key}-divider`}
              orientation="vertical"
            />
          );
        }

        return parts;
      })}
    </Group>
  );
};
