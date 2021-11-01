import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

interface NavLinkProps {
  label: string;
  href: string;
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const NavLink = ({ label, href = "" }: NavLinkProps) => (
    <NextLink href={href}>
      <Link mr={4} color="white">
        {label}
      </Link>
    </NextLink>
  );

  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NavLink label="Login" href="/login" />
        <NavLink label="Register" href="/register" />
      </>
    );
  } else {
    body = (
      <Flex color="white">
        <Box mr={4}>{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
