import Link from "next/link";
import React from "react";

import {
  createStyles,
  Navbar,
  NavLink,
  ScrollArea,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBriefcase, IconShield } from "@tabler/icons";

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

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!navOpen} width={{ sm: smWidth }}>
      <Navbar.Section className={classes.section}>
        <Tooltip.Group openDelay={500} closeDelay={100}>
          {navLinks}
        </Tooltip.Group>
      </Navbar.Section>
      <Navbar.Section
        grow
        component={ScrollArea}
        mx="-xs"
        px="xs"
        className={classes.section}
      >
        {layout !== LayoutType.COMPACT && (
          <>
            {/* TODO: Make this users actual inventories */}
            <NavLink href="/inventory" component={Link} label="My first bag" />
            <NavLink href="/inventory" component={Link} label="My first bag" />
            <NavLink href="/inventory" component={Link} label="My first bag" />
            <NavLink href="/inventory" component={Link} label="My first bag" />
            <NavLink href="/inventory" component={Link} label="My first bag" />
            <NavLink href="/inventory" component={Link} label="My first bag" />
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
