import Link from "next/link";
import React from "react";

import { Button, ButtonProps } from "@mantine/core";

export type NavButtonProps = ButtonProps & {
  href: string;
};

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  href,
  ...rest
}) => {
  return (
    <Button component={Link} href={href} {...rest}>
      {children}
    </Button>
  );
};
