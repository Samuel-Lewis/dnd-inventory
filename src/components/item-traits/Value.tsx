import Image from "next/image";
import React from "react";

import { Group, Text, Tooltip } from "@mantine/core";

import { getValue } from "~/lib/value";

import copperCoin from "./currency/copper.png";
import goldCoin from "./currency/gold.png";
import platinumCoin from "./currency/platinum.png";
import silverCoin from "./currency/silver.png";

export interface ValueTraitProps {
  value?: number;
}

export const ValueTrait: React.FC<ValueTraitProps> = ({ value }) => {
  if (!value) {
    return null;
  }
  const { copper, silver, gold, platinum } = getValue(value);

  return (
    <Tooltip label={value.toLocaleString()}>
      <Group spacing="xs" position="center" noWrap>
        {platinum > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{platinum}</Text>
            <Image src={platinumCoin.src} width={16} height={16} alt="" />
          </Group>
        )}

        {gold > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{gold}</Text>
            <Image src={goldCoin.src} width={16} height={16} alt="" />
          </Group>
        )}
        {silver > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{silver}</Text>
            <Image src={silverCoin.src} width={16} height={16} alt="" />
          </Group>
        )}
        {copper > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{copper}</Text>
            <Image src={copperCoin.src} width={16} height={16} alt="" />
          </Group>
        )}
      </Group>
    </Tooltip>
  );
};
