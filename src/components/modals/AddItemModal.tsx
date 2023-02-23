import React, { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { Text } from "@mantine/core";
import { ContextModalProps, openContextModal } from "@mantine/modals";
import { OpenContextModal } from "@mantine/modals/lib/context";

import { itemConnection } from "~/api/firebase/firestore/item";
import { InventoryItemEntry } from "~/api/firebase/models/Inventory";
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
  const [items] = useCollection(
    itemConnection.publicItemsQuery(localUser?.ref ?? null)
  );

  const transformedItems = useMemo(() => {
    if (!items) {
      return [];
    }

    return items.docs.map((doc) => {
      const data = doc.data();
      return {
        item: { ref: doc.ref, data, snap: doc },
        itemRef: doc.ref,
      };
    });
  }, [items]);

  return (
    <>
      <Text>All the items! {id}</Text>
      <ItemIndex inventoryItems={transformedItems} />
    </>
  );
};
