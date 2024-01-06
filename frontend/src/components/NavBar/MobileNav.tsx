import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { NavItem } from '@/types';

export const MobileNav = ({ items }: { items: NavItem[] }): ReactElement => {
  return (
    <Flex align='center' width='75%' mx='auto' mb={8}>
      <Stack w='100%' display={{ md: 'none' }}>
        {items.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        <Button as='a' href={'/login'}>
          Login
        </Button>
      </Stack>
    </Flex>
  );
};

const MobileNavItem = ({ label, href }: NavItem): ReactElement => {
  return (
    <Stack spacing={4}>
      <Flex py={2} as={Link} href={href} justify='space-between' align='center'>
        <Text fontWeight={600}>{label}</Text>
      </Flex>
    </Stack>
  );
};
