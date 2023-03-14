import React from "react";

import { Center, Loader } from "@mantine/core";

export interface LoadingBlockProps {
  isLoading: boolean;
  children?: React.ReactNode;
  height?: number;
}

export const LoadingBlock: React.FC<LoadingBlockProps> = ({
  isLoading,
  height,
  children,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <Center sx={{ height }} m="sm">
      <Loader size="md" />
    </Center>
  );
};
