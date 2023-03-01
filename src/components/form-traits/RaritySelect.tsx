import React from "react";

import { NativeSelect } from "@mantine/core";

type NativeSelectProps = React.ComponentProps<typeof NativeSelect>;

export type RaritySelectProps = Omit<NativeSelectProps, "data">;

export const RaritySelect: React.FC<RaritySelectProps> = (props) => {
  const data = [
    { value: "varies", label: "Varies" },
    { value: "common", label: "Common" },
    { value: "uncommon", label: "Uncommon" },
    { value: "rare", label: "Rare" },
    { value: "very rare", label: "Very rare" },
    { value: "legendary", label: "Legendary" },
    { value: "artifact", label: "Artifact" },
  ];

  return <NativeSelect {...props} data={data} />;
};
