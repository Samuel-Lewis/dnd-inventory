import React from "react";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// import { GlobalFooter } from "./GlobalFooter";
import { GlobalHeader } from "./GlobalHeader";
import { GlobalNav } from "./GlobalNav";

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [navOpen, navHandlers] = useDisclosure(false);

  return (
    <AppShell
      fixed
      header={
        <GlobalHeader toggleNavOpened={navHandlers.toggle} navOpen={navOpen} />
      }
      // footer={<GlobalFooter />}
      navbar={<GlobalNav navOpen={navOpen} />}
      navbarOffsetBreakpoint="sm"
      sx={{
        ".mantine-AppShell-main": {
          height: "calc(100vh - var(--mantine-header-height))",
        },
      }}
    >
      {children}
    </AppShell>
  );
};
