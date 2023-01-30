import Fuse from "fuse.js";
import React, { useMemo, useState } from "react";

import { TextInput, Text, List } from "@mantine/core";

import { APIReferenceList } from "~/api/dnd5e/generated";

type EquipmentPageProps = {
  referenceList: APIReferenceList;
};

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  useExtendedSearch: true,
  keys: ["name", "index"],
};

const EquipmentPage: React.FC<EquipmentPageProps> = ({
  referenceList = {},
}) => {
  const [searchValue, setSearchValue] = useState("");
  const fuse = useMemo(
    () => new Fuse(referenceList.results || [], fuseOptions),
    [referenceList.results]
  );

  const searchList = useMemo(() => {
    if (!searchValue) {
      return (referenceList.results ?? []).map((item) => ({ item, score: 1 }));
    }

    return fuse.search(searchValue);
  }, [searchValue, fuse, referenceList]);

  if (!referenceList || !referenceList.results) {
    return null;
  }

  return (
    <>
      <h1>Equipment List</h1>
      <TextInput
        label="Search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />
      <List withPadding>
        {searchList.map(({ item }) => (
          <List.Item key={item.index}>
            <Text>{item.name ?? item.index} </Text>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default EquipmentPage;
