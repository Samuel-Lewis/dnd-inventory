import { QueryDocumentSnapshot } from "firebase/firestore";
import Fuse from "fuse.js";
import Link from "next/link";
import React, { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  createStyles,
  Text,
  Table,
  Title,
  Stack,
  Center,
  Loader,
  TextInput,
  Group,
  Anchor,
} from "@mantine/core";

import { itemConnection } from "~/api/firebase/firestore/item";
import { Item } from "~/api/firebase/models/Item";
import { DocMeta } from "~/api/firebase/models/Meta";
import { Category } from "~/components/Category";
import { Value } from "~/components/Value";
import { Weight } from "~/components/Weight";
import { useLocalUser } from "~/hooks/useLocalUser";

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: [
    {
      name: "name",
      getFn: (i: QueryDocumentSnapshot<Item & DocMeta>) => i.data().name,
    },
    {
      name: "description",
      getFn: (i: QueryDocumentSnapshot<Item & DocMeta>) =>
        i.data().description ?? "",
    },
    {
      name: "srdRefSlug",
      getFn: (i: QueryDocumentSnapshot<Item & DocMeta>) =>
        i.data().srdRefSlug ?? "",
    },
  ],
};

const useStyles = createStyles(() => ({
  table: {
    thead: {
      tr: {
        th: {
          textAlign: "center",
        },
        td: {
          minWidth: 100,
        },
      },
    },
  },
  centerAlign: {
    textAlign: "center",
  },
}));

const ItemIndexPage: React.FC = () => {
  const { localUser } = useLocalUser();
  const [items, itemsLoading, itemsError] = useCollection(
    itemConnection.publicItemsQuery(localUser?.ref ?? null)
  );
  const [searchValue, setSearchValue] = React.useState("");

  const fuse = useMemo(
    () => new Fuse(items?.docs ?? [], fuseOptions),
    [items?.docs]
  );

  const searchList = useMemo(() => {
    if (!searchValue) {
      return items?.docs ?? [];
    }

    return fuse.search(searchValue).map((result) => result.item);
  }, [searchValue, fuse, items?.docs]);

  const { classes } = useStyles();

  return (
    <Stack>
      <Title>All Items</Title>
      {itemsError && <Text>{itemsError.message}</Text>}
      {itemsLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      {items && (
        <>
          <TextInput
            label="Search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Weight</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {searchList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Group noWrap spacing={4}>
                      <Category category={item.data().category} compact />
                      <Link href={`/item/${item.id}`}>
                        <Anchor sx={{ whiteSpace: "nowrap" }} inherit>
                          {item.data().name}
                        </Anchor>
                      </Link>
                    </Group>
                  </td>
                  <td className={classes.centerAlign}>
                    <Value value={item.data().value} />
                  </td>
                  <td className={classes.centerAlign}>
                    <Weight weight={item.data().weight} />
                  </td>
                  <td>
                    <Text lineClamp={2}>{item.data().description}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Stack>
  );
};

export default ItemIndexPage;
