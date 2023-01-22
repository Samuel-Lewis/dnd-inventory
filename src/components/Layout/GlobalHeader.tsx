import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { Avatar, Group, Header, Skeleton, Burger } from "@mantine/core";
import { ThemeToggle } from "@samuel-lewis/components";

import { firebase } from "~/api/firebase";

export interface GlobalHeaderProps {
  toggleNavOpened: () => void;
  navOpen: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  toggleNavOpened,
  navOpen,
}) => {
  const [user, loading, error] = useAuthState(firebase.auth);

  return (
    <Header height={60} p="sm">
      <Group position="apart">
        <Burger opened={navOpen} onClick={toggleNavOpened} />

        <Group>
          <ThemeToggle />
          <Skeleton height={40} circle visible={loading}>
            <Avatar component={Link} href="/user" radius="xl" />
          </Skeleton>
        </Group>
      </Group>
    </Header>
  );
};
