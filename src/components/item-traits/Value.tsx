import Image from "next/image";
import React from "react";

import { Group, Text, Tooltip } from "@mantine/core";

import { getValue } from "~/lib/value";

import copperCoin from "../../../public/currency/copper.png";
import goldCoin from "../../../public/currency/gold.png";
import platinumCoin from "../../../public/currency/platinum.png";
import silverCoin from "../../../public/currency/silver.png";

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
            <Image src={platinumCoin} width={16} height={16} alt="" />
          </Group>
        )}

        {gold > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{gold}</Text>
            <Image src={goldCoin} width={16} height={16} alt="" />
          </Group>
        )}
        {silver > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{silver}</Text>
            <Image src={silverCoin} width={16} height={16} alt="" />
          </Group>
        )}
        {copper > 0 && (
          <Group spacing={2} noWrap>
            <Text weight={600}>{copper}</Text>
            <Image src={copperCoin} width={16} height={16} alt="" />
          </Group>
        )}
      </Group>
    </Tooltip>
  );
};
