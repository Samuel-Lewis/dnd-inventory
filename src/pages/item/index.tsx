import React, { useMemo } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import { Title, Stack } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { HydratedInventoryItemEntry } from "~/api/models/Inventory";
import { ItemIndex } from "~/components/ItemIndex";
import { useLocalUser } from "~/hooks/useLocalUser";

const ItemIndexPage: React.FC = () => {
  const { localUser } = useLocalUser();
  const [publicItems] = useCollectionOnce(
    itemConnection.publicItemsQuery(localUser?.ref ?? null),
    {
      getOptions: { source: "cache" },
    }
  );

  const transformedItems = useMemo(() => {
    if (!publicItems) {
      return [];
    }

    return publicItems.docs.map((doc) => {
      const data = doc.data();
      const t: HydratedInventoryItemEntry = {
        item: { ref: doc.ref, data, snap: doc },
        itemRef: doc.ref,
        quantity: -1,
      };
      return t;
    });
  }, [publicItems]);

  return (
    <Stack sx={{ height: "100%" }}>
      <Title>All Items</Title>
      <ItemIndex inventoryItems={transformedItems} />
    </Stack>
  );
};

export default ItemIndexPage;
