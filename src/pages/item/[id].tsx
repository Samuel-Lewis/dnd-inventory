import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Center, Loader, Stack, Title, Text } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";

const ItemIdPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, itemLoading, itemError] = useDocument(
    itemConnection.getDoc(id as string)
  );
  if (typeof id !== "string") {
    console.error("id is not a string", id);
    return null;
  }

  const data = item?.data();
  if (!data) {
    return null;
  }

  return (
    <Stack>
      <Title>{data.name ?? "Loading"}</Title>
      {itemError && <Text>{itemError.message}</Text>}
      {itemLoading && (
        <Center>
          <Loader />
        </Center>
      )}

      {data && (
        <>
          <Text> {data.weight && `${data.weight} lbs`}</Text>
          <Text>{data.rarity && `${data.rarity} rarity`}</Text>

          <Text>{data.description}</Text>
        </>
      )}
    </Stack>
  );
};

export default ItemIdPage;
