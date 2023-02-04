import React from "react";

import { Text, Tooltip } from "@mantine/core";

export interface WeightProps {
  weight?: number;
}

const lbToKg = (lb: number) => (lb * 0.45359237).toFixed(2);

export const Weight: React.FC<WeightProps> = ({ weight }) => {
  if (!weight) {
    return <Text>-</Text>;
  }

  const kg = lbToKg(weight);
  const lbLabel = `${weight} lb${weight === 1 ? "" : "s"}`;
  const kgLabel = `${kg} kg${kg === "1.00" ? "" : "s"}`;

  return (
    <Tooltip label={kgLabel}>
      <Text>{lbLabel}</Text>
    </Tooltip>
  );
};
