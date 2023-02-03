import { useRouter } from "next/router";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

import { Center, Loader, Stack, Title, Text } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { Value } from "~/components/Value";

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
          <Value value={data.value} />
          <Text> {data.weight && `${data.weight} lbs`}</Text>
          <Text>{data.rarity && `${data.rarity} rarity`}</Text>

          <Text>{data.description}</Text>
        </>
      )}

      {/* <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>
            No perms
            <ul>
              <li>public/member/owner: Public view of item</li>
              <li>
                public/member/owner: Button to add to inventory, prompts signup
                if not logged in
              </li>
              <li>protected/private: Doesnt exist</li>
            </ul>
          </li>
          <li>Owner: Edit fields</li>
        </ul>
      </Paper> */}
    </Stack>
  );
};

export default ItemIdPage;
