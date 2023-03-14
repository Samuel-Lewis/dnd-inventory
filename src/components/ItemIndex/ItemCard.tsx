import Link from "next/link";
import React, { useMemo } from "react";

import {
  Text,
  Grid,
  Group,
  Stack,
  Title,
  Spoiler,
  createStyles,
} from "@mantine/core";

import { HydratedInventoryItemEntry } from "~/api/models/Inventory";

import { FancyPaper } from "../FancyPaper";
import { CategoryTrait, TraitLine } from "../item-traits";

const useStyles = createStyles(() => ({
  titleLink: {
    textDecoration: "none",
    color: "inherit",
    ":hover": {
      textDecoration: "underline",
    },
  },
}));

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
  const { classes } = useStyles();

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
    return (
      <Link
        href={`/item/${inventoryItem.itemRef.id}`}
        className={classes.titleLink}
      >
        {titleText}
      </Link>
    );
  }, [classes.titleLink, fullSize, inventoryItem.itemRef.id, name]);

  const srdDesc = useMemo(() => {
    const text = (
      <Stack mt={fullSize ? "sm" : undefined}>
        {notes && <Text>{notes}</Text>}
        {description && <Text fs="italic">{description}</Text>}
      </Stack>
    );

    if (fullSize) {
      return text;
    }

    return (
      <Spoiler hideLabel="Hide" showLabel="Show" maxHeight={26}>
        {text}
      </Spoiler>
    );
  }, [description, fullSize, notes]);

  return (
    <FancyPaper rarity={rarity} sx={{ height: fullSize ? "100%" : undefined }}>
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
            <Group spacing="sm">{rightSide}</Group>
          </Grid.Col>
        </Grid>
        {srdDesc}
      </Stack>
    </FancyPaper>
  );
};
