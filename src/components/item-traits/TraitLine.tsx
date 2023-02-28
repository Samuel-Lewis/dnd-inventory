import React, { useMemo } from "react";

import { Badge, Divider, Group } from "@mantine/core";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";

import { RarityTrait } from "./Rarity";
import { ValueTrait } from "./Value";
import { WeightTrait } from "./Weight";

export interface TraitLineProps {
  inventoryItem: HydratedInventoryItemEntry;
}

export const TraitLine: React.FC<TraitLineProps> = ({ inventoryItem }) => {
  const { weight, rarity, value } = inventoryItem.item?.data ?? {};
  const { id } = inventoryItem.itemRef;
  const cached = inventoryItem.item?.snap.metadata.fromCache ?? false;

  const parts = useMemo(() => {
    return [
      <RarityTrait key={`rarity-${id}`} rarity={rarity} />,
      <ValueTrait key={`value-${id}`} value={value} />,
      <WeightTrait key={`weight-${id}`} weight={weight} />,
      <Badge key={`cache-${id}`} color={cached ? "green" : "red"}>
        {cached ? "Cached" : "Server"}
      </Badge>,
    ].map((part, index, array) => (
      <>
        {part}
        {index < array.length - 1 && (
          <Divider m={0} p={0} orientation="vertical" />
        )}
      </>
    ));
  }, [id, rarity, value, weight, cached]);

  return <Group spacing="xs">{parts}</Group>;
};
