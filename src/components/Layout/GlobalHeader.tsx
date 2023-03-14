import Link from "next/link";
import React from "react";

import { Avatar, Group, Header, Skeleton, Burger } from "@mantine/core";
import { ThemeToggle } from "@samuel-lewis/components";

import { useLocalUser } from "~/hooks/useLocalUser";

import { GlobalTitle } from "../GlobalTitle";

export interface GlobalHeaderProps {
  toggleNavOpened: () => void;
  navOpen: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  toggleNavOpened,
  navOpen,
}) => {
  const { isLoading } = useLocalUser();

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
          <ThemeToggle />
          <Skeleton height={40} circle visible={isLoading}>
            <Avatar component={Link} href="/user" radius="xl" />
          </Skeleton>
        </Group>
      </Group>
    </Header>
  );
};
