import React from "react";

import { AppShell, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

// import { GlobalFooter } from "./GlobalFooter";
import { GlobalHeader } from "./GlobalHeader";
import { GlobalNav } from "./GlobalNav";

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [navOpen, navHandlers] = useDisclosure(false);
  const theme = useMantineTheme();
  const smallLayout = useMediaQuery(
    `(max-width: ${theme.breakpoints.sm}px)`,
    true,
    {
      getInitialValueInEffect: false,
    }
  );

  return (
    <AppShell
      fixed
      header={
        <GlobalHeader toggleNavOpened={navHandlers.toggle} navOpen={navOpen} />
      }
      // footer={<GlobalFooter />}
      navbar={<GlobalNav navOpen={navOpen} />}
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
