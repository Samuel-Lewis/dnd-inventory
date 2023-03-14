import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";

import { itemConnection } from "~/api/firebase/firestore/item";

export const useAvailableItems = () => {
  const [systemItems, systemItemsLoading, systemItemsError] = useCollectionOnce(
    itemConnection.systemItemsQuery(),
    {
      getOptions: { source: "cache" },
    }
  );

  const [publicItems, publicItemsLoading, publicItemsError] = useCollection(
    itemConnection.publicItemsQuery()
  );

  const docs = [...(systemItems?.docs || []), ...(publicItems?.docs || [])];

  const combinedSnapshot = {
    size: docs.length,
    empty: docs.length === 0,
    docs,
  };

  return [
    combinedSnapshot,
    systemItemsLoading || publicItemsLoading,
    systemItemsError || publicItemsError,
  ] as const;
};
