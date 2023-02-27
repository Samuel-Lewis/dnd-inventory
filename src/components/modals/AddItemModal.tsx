import React, { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { Stack, Text } from "@mantine/core";
import { ContextModalProps, openContextModal } from "@mantine/modals";
import { OpenContextModal } from "@mantine/modals/lib/context";

import { itemConnection } from "~/api/firebase/firestore/item";
import { InventoryItemEntry } from "~/api/models/Inventory";
import { useLocalUser } from "~/hooks/useLocalUser";

import { ItemIndex } from "../ItemIndex";

export type AddItemModalInnerProps = {
  onConfirm: () => InventoryItemEntry[];
};

export const ADD_ITEM_MODAL_KEY = "addItem";

export const addItemModalFactory = (
  innerProps: AddItemModalInnerProps,
  modalProps: Omit<OpenContextModal, "innerProps"> = {}
) => {
  return () =>
    openContextModal({
      modal: ADD_ITEM_MODAL_KEY,
      sx: {
        ".mantine-Modal-modal": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      },
      title: "Add Item",
      ...modalProps,
      innerProps,
    });
};

export const AddItemModal: React.FC<
  ContextModalProps<AddItemModalInnerProps>
> = ({
  /*context, id, innerProps*/
  id,
}) => {
  const { localUser } = useLocalUser();
  const [publicItems] = useCollection(
    itemConnection.publicItemsQuery(localUser?.ref ?? null)
  );

  const transformedItems = useMemo(() => {
    if (!publicItems) {
      return [];
    }

    return publicItems.docs.map((doc) => {
      const data = doc.data();
      return {
        item: { ref: doc.ref, data, snap: doc },
        itemRef: doc.ref,
      };
    });
  }, [publicItems]);

  return (
    <Stack sx={{ height: "100%" }}>
      <Text>All the items! {id}</Text>
      <ItemIndex inventoryItems={transformedItems} />
    </Stack>
  );
};
