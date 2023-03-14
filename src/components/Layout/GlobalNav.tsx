import Link from "next/link";
import React from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import {
  createStyles,
  Navbar,
  NavLink,
  Text,
  ScrollArea,
  Tooltip,
  useMantineTheme,
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBriefcase, IconShield } from "@tabler/icons";

import { inventoryConnection } from "~/api/firebase/firestore/inventory";

import { FancyNavButton } from "./FancyNavButton";
import { LayoutType } from "./types";

// Navbar has four layouts:
// - < sm
//   - collapsed: hidden
//   - expanded: full screen
// - >= sm
//   - collapsed: compact bar @ 80px
//   - expanded: nav bar @ 200px

const COMPACT_WIDTH = 80;
const EXPANDED_WIDTH = 200;

const getLayout = (smallScreen: boolean, navOpen: boolean): LayoutType => {
  if (smallScreen) {
    return navOpen ? LayoutType.FULL_SCREEN : LayoutType.HIDDEN;
  } else {
    return navOpen ? LayoutType.EXPANDED : LayoutType.COMPACT;
  }
};

const useStyles = createStyles((theme) => ({
  section: {
    padding: theme.spacing.xs,
  },
}));

export interface GlobalNavProps {
  navOpen: boolean;
}

const data = [
  { link: "/inventory", label: "Inventories", Icon: IconBriefcase },
  { link: "/item", label: "Items", Icon: IconShield },
];

/** TODO
 * scroll bar is on outside of scroll area
 * mobile: logout button is not showing
 * mobile: navbar scroll area is not working
 */

export const GlobalNav: React.FC<GlobalNavProps> = ({ navOpen }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery(
    `(max-width: ${theme.breakpoints.sm}px)`,
    true,
    {
      getInitialValueInEffect: false,
    }
  );

  const layout = getLayout(smallScreen, navOpen);

  const smWidth =
    layout === LayoutType.COMPACT || layout === LayoutType.HIDDEN
      ? COMPACT_WIDTH
      : EXPANDED_WIDTH;

  const navLinks = data.map(({ link, label, Icon }) => (
    <FancyNavButton
      key={link}
      link={link}
      Icon={Icon}
      label={label}
      layout={layout}
    />
  ));

  const [inventories] = useCollectionOnce(
    inventoryConnection.allInventoriesQuery()
  );

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!navOpen} width={{ sm: smWidth }}>
      <Navbar.Section className={classes.section}>
        <Tooltip.Group openDelay={500} closeDelay={100}>
          {navLinks}
        </Tooltip.Group>
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} className={classes.section}>
        {layout !== LayoutType.COMPACT && (
          <>
            <Divider px="sm" label="Recent Inventories" />
            {inventories?.docs.map((doc) => (
              <NavLink
                key={doc.id}
                href={`/inventory/${doc.id}`}
                component={Link}
                label={<Text>{doc.data().name}</Text>}
              />
            ))}
          </>
        )}
      </Navbar.Section>

      {/* <Navbar.Section className={classes.section}>
        <FancyNavButton
          link="/user/logout"
          Icon={IconLogout}
          label="Logout"
          layout={layout}
        />
      </Navbar.Section> */}
    </Navbar>
  );
};
