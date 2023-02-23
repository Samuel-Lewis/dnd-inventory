import React, { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { Text, Title, Stack, Center, Loader } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { ItemIndex } from "~/components/ItemIndex";
import { useLocalUser } from "~/hooks/useLocalUser";

const ItemIndexPage: React.FC = () => {
  const { localUser } = useLocalUser();
  const [items, itemsLoading, itemsError] = useCollection(
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
    <Stack>
      <Title>All Items</Title>
      {itemsError && <Text>{itemsError.message}</Text>}
      {itemsLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      <ItemIndex inventoryItems={transformedItems} />
    </Stack>
  );
};

export default ItemIndexPage;
