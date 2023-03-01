import React, { forwardRef, useMemo } from "react";

import { Select } from "@mantine/core";

import { ItemCategory } from "~/api/models/Item";
import { itemCategories } from "~/lib/category/category";

import { CategoryTrait } from "../item-traits";

type SelectProps = React.ComponentProps<typeof Select>;

export type CategorySelectProps = Omit<SelectProps, "data">;

interface SelectItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: ItemCategory;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, ...others }: SelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <CategoryTrait useTooltip={false} category={value} />
    </div>
  )
);
SelectItem.displayName = "SelectItem";

const data = Object.entries(itemCategories)
  .sort((a, b) => a[1].name.localeCompare(b[1].name))
  .map(([key, value]) => ({
    label: value.name,
    value: key,
  }));

export const CategorySelect: React.FC<CategorySelectProps> = (props) => {
  const icon = useMemo(
    () => (
      <CategoryTrait useLabel={false} category={props.value as ItemCategory} />
    ),
    [props.value]
  );

  return (
    <Select
      searchable
      itemComponent={SelectItem}
      icon={icon}
      data={data}
      {...props}
    />
  );
};
