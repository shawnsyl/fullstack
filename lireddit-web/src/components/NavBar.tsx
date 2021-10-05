import { Box, Flex, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";

interface NavBarProps {}

interface NavLinkProps {
  label: string;
  href: string;
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const NavLink = ({ label, href = "" }: NavLinkProps) => (
    <NextLink href={href}>
      <Link mr={4} color="white">
        {label}
      </Link>
    </NextLink>
  );

  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">
        <NavLink label="Login" href="/login" />
        <NavLink label="Register" href="/register" />
      </Box>
    </Flex>
  );
};
