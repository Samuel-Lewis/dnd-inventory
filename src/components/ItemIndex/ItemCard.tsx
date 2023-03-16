import Link from "next/link";
import React, { useMemo } from "react";

import { Text, Grid, Group, Stack, Title } from "@mantine/core";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";

import { FancyPaper } from "../FancyPaper";
import { CategoryTrait, TraitLine } from "../item-traits";

export interface ItemCardProps {
  inventoryItem: HydratedInventoryItemEntry;
  renderSideElement?: (item: HydratedInventoryItemEntry) => React.ReactNode;
  fullSize?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  inventoryItem,
  renderSideElement,
  fullSize = false,
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

  const title = useMemo(() => {
    const titleText = <Title order={3}>{name}</Title>;

    if (fullSize) {
      return titleText;
    }
    return <Link href={`/item/${inventoryItem.itemRef.id}`}>{titleText}</Link>;
  }, [fullSize, inventoryItem.itemRef.id, name]);

  return (
    <FancyPaper
      rarity={rarity}
      m={fullSize ? 0 : "xs"}
      sx={{
        height: fullSize ? undefined : 150,
        minHeight: fullSize ? "100%" : 0,
      }}
    >
      <Stack spacing={0}>
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
                {title}
                <Text mt={-6} color="dimmed">
                  <CategoryTrait category={category} useLabel useIcon={false} />
                </Text>
                <TraitLine inventoryItem={inventoryItem} showCategory={false} />
              </Stack>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group position="right" spacing="sm">
              {rightSide}
            </Group>
          </Grid.Col>
        </Grid>
        {/* TODO, make this in a scroll area */}
        <Stack mt={2} spacing={2}>
          {notes && <Text lineClamp={fullSize ? undefined : 1}>{notes}</Text>}
          {description && (
            <Text fs="italic" lineClamp={fullSize ? undefined : 1}>
              {description}
            </Text>
          )}
        </Stack>
      </Stack>
    </FancyPaper>
  );
};
