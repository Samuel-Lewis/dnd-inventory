import React from "react";

import { Anchor, Footer, Text } from "@mantine/core";

export const GlobalFooter: React.FC = () => {
  return (
    <Footer height={40} withBorder={false}>
      <Text align="center" p="xs" c="dimmed">
        Made by{" "}
        <Anchor
          inherit
          href="https://samuel-lewis.com/"
          target="_blank"
          rel="_noopener"
          c="dimmed"
        >
          Samuel Lewis
        </Anchor>
      </Text>
    </Footer>
  );
};
