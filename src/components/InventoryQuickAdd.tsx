import { QuerySnapshot } from "firebase/firestore";
import React, { useCallback } from "react";

import { ActionIcon, Button, Menu } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { HydratedInventoryItemEntry, Inventory } from "~/api/models/Inventory";

export interface InventoryQuickAddProps {
  item: HydratedInventoryItemEntry;
  inventories?: QuerySnapshot<Inventory>;
  compact?: boolean;
}

export const InventoryQuickAdd: React.FC<InventoryQuickAddProps> = ({
  item,
  inventories,
  compact = false,
}) => {
  const addToInventory = useCallback(
    (item: HydratedInventoryItemEntry, inventoryId: string) => {
      const invItem = {
        itemRef: item.itemRef,
        quantity: 1,
      };
      inventoryConnection.addItem(inventoryId, invItem);
    },
    []
  );

  return (
    <Menu shadow="md" width={200} withinPortal>
      <Menu.Target>
        {compact ? (
          <ActionIcon variant="filled">
            <IconPlus size={18} />
          </ActionIcon>
        ) : (
          <Button
            variant="filled"
            leftIcon={<IconPlus size={18} />}
            color="gray"
          >
            Quick add
          </Button>
        )}
        {/*  */}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Add to...</Menu.Label>
        <>
          {inventories?.docs.map((i) => (
            <Menu.Item key={i.id} onClick={() => addToInventory(item, i.id)}>
              {i.data().name}
            </Menu.Item>
          ))}
        </>
      </Menu.Dropdown>
    </Menu>
  );
};
