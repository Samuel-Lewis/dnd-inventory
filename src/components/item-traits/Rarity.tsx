import React from "react";

import { Text } from "@mantine/core";

import { Rarity } from "~/api/models/common";

export interface RarityTraitProps {
  rarity?: Rarity;
}

export const RarityTrait: React.FC<RarityTraitProps> = ({ rarity }) => {
  if (!rarity) {
    return null;
  }

  return <Text sx={{ fontVariant: "small-caps" }}>{rarity}</Text>;
};
