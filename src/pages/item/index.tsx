import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { createStyles, Text, Table } from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { Value } from "~/components/Value";
import { useLocalUser } from "~/hooks/useLocalUser";

const useStyles = createStyles(() => ({
  table: {
    thead: {
      tr: {
        th: {
          textAlign: "center",
        },
      },
    },
  },
  centerAlign: {
    textAlign: "center",
  },
  desc: {
    maxWidth: 400,
  },
}));

const ItemIndexPage: React.FC = () => {
  const { localUser } = useLocalUser();
  const [items, itemsLoading, itemsError] = useCollection(
    itemConnection.publicItemsQuery(localUser?.ref ?? null)
  );

  const { classes } = useStyles();

  return (
    <div>
      <h1>ItemIndexPage</h1>
      {itemsLoading && <p>Loading...</p>}
      {itemsError && <p>Error: {itemsError.message}</p>}
      {items && (
        <Table className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Weight</th>
              <th className={classes.table}>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.docs.map((item) => (
              <tr key={item.id}>
                <td>{item.data().name}</td>
                <td className={classes.centerAlign}>
                  <Value value={item.data().value} />
                </td>
                <td className={classes.centerAlign}>
                  {(item.data().weight ?? 0) > 0
                    ? `${item.data().weight} lbs`
                    : "-"}
                </td>
                <td className={classes.table}>
                  <Text lineClamp={2}>{item.data().description}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* <Paper withBorder p="sm">
        <Title order={3}>TODO</Title>
        <ul>
          <li>Big ole item search</li>
          <li>List of SRD items</li>
          <li>List of user items</li>
        </ul>
      </Paper> */}
    </div>
  );
};

export default ItemIndexPage;
