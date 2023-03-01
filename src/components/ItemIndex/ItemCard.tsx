import React, { useMemo } from "react";

import { Text, Grid, Group, Stack, Title, Spoiler } from "@mantine/core";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";

import { FancyPaper } from "../FancyPaper";
import { CategoryTrait, TraitLine } from "../item-traits";

export interface ItemCardProps {
  inventoryItem: HydratedInventoryItemEntry;
  renderSideElement?: (item: HydratedInventoryItemEntry) => React.ReactNode;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  inventoryItem,
  renderSideElement,
}) => {
  const { name, description, rarity, category } =
    inventoryItem.item?.data ?? {};
  const notes = inventoryItem.notes;

  const rightSide = useMemo(() => {
    if (renderSideElement) {
      return renderSideElement(inventoryItem);
    }
    return null;
  }, [inventoryItem, renderSideElement]);

  return (
    <FancyPaper rarity={rarity}>
      <Stack spacing="xs">
        <Grid>
          <Grid.Col span={9}>
            <Group spacing="sm">
              <CategoryTrait
                category={category}
                useTooltip
                useLabel={false}
                iconSize={30}
              />
              <Stack spacing={0}>
                <Title order={3}>{name}</Title>
                <Text mt={-6} color="dimmed">
                  <CategoryTrait category={category} useLabel useIcon={false} />
                </Text>
                <TraitLine inventoryItem={inventoryItem} showCategory={false} />
              </Stack>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group spacing="sm">{rightSide}</Group>
          </Grid.Col>
        </Grid>
        <Spoiler hideLabel="Hide" showLabel="Show" maxHeight={26}>
          <Stack>
            {notes && <Text>{notes}</Text>}
            {description && <Text fs="italic">{description}</Text>}
          </Stack>
        </Spoiler>
      </Stack>
    </FancyPaper>
  );
};
