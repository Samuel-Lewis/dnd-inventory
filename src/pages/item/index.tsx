import React, { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { Title, Stack } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { ItemIndex } from "~/components/ItemIndex";
import { useLocalUser } from "~/hooks/useLocalUser";

const ItemIndexPage: React.FC = () => {
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
    <Stack sx={{ height: "100%" }}>
      <Title>All Items</Title>
      <ItemIndex inventoryItems={transformedItems} />
    </Stack>
  );
};

export default ItemIndexPage;
