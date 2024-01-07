import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { NavItem } from '@/types';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import AuthAtom from '@/stores/authStore';

export const MobileNav = ({ items }: { items: NavItem[] }): ReactElement => {
  const { isLoggedIn } = useAtomValue(AuthAtom);
  return (
    <Flex align='center' width='75%' mx='auto' mb={8}>
      <Stack w='100%' display={{ md: 'none' }}>
        {items.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        {isLoggedIn && (
          <Button as={Link} to={'/login'}>
            Login
          </Button>
        )}
      </Stack>
    </Flex>
  );
};

const MobileNavItem = ({ label, href }: NavItem): ReactElement => {
  return (
    <Stack spacing={4}>
      <Flex py={2} as={Link} to={href} justify='space-between' align='center'>
        <Text fontWeight={600}>{label}</Text>
      </Flex>
    </Stack>
  );
};
