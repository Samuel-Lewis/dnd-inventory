import Link from "next/link";
import React from "react";

import { Avatar, Group, Header, Burger } from "@mantine/core";

import { GlobalTitle } from "../GlobalTitle";

export interface GlobalHeaderProps {
  toggleNavOpened: () => void;
  navOpen: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  toggleNavOpened,
  navOpen,
}) => {
  return (
    <Header height={60} p="sm">
      <Group position="apart">
        <Group>
          <Burger opened={navOpen} onClick={toggleNavOpened} />
          <Link href="/">
            <GlobalTitle size="1.5rem" />
          </Link>
        </Group>
        <Group>
          {/* <ThemeToggle /> */}
          <Avatar component={Link} href="/user" radius="xl" />
        </Group>
      </Group>
    </Header>
  );
};
