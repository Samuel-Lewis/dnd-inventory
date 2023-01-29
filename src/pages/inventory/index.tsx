import { getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";

import { Paper, Title } from "@mantine/core";

import { firebase } from "~/api/firebase";
import { ConnectionReturn } from "~/api/firebase/firestore/connection";
import { inventoryConnection } from "~/api/firebase/firestore/inventory";
import { userConnection } from "~/api/firebase/firestore/user";
import { Inventory } from "~/api/firebase/models/Inventory";

interface InventoryIndexPageProps {
  inventories?: Inventory[];
}

const InventoryIndexPage: React.FC<InventoryIndexPageProps> = ({
  inventories,
}) => {
  if (!inventories) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1>InventoryIndexPage</h1>
      {JSON.stringify(inventories, null, 2)}
      <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>List of your own inventories</li>
          <li>Potentially a list of public or friends inventories?</li>
        </ul>
      </Paper>
    </div>
  );
};

export default InventoryIndexPage;

export const getServerSideProps: GetServerSideProps<
  InventoryIndexPageProps
> = async (context) => {
  // ownedInventoriesQuery

  if (firebase.auth.currentUser === null) {
    console.error("No user logged in");
    return { props: {} };
  }

  const localUserResult = await userConnection.getDoc(
    firebase.auth.currentUser.uid
  );

  if (!localUserResult) {
    return { props: {} };
  }

  const query = inventoryConnection.ownedInventoriesQuery(localUserResult.ref);
  const docs = await getDocs(query);
  const inventories = docs.docs.map((doc) => doc.data());

  return {
    props: {
      inventories,
    },
  };
};
