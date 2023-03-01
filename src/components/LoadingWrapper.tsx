import React from "react";

import { Center, Loader } from "@mantine/core";

export interface LoadingWrapperProps {
  isLoading: boolean;
  children?: React.ReactNode;
  height?: number;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  height,
  children,
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <Center sx={{ height }}>
      <Loader size="xl" />
    </Center>
  );
};
