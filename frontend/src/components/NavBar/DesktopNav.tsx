import { NavItem } from '@/types';
import { Box, Link, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

export const DesktopNav = ({ items }: { items: NavItem[] }): ReactElement => {
  return (
    <Stack direction='row' spacing={4} alignItems='center'>
      {items.map((i) => (
        <Box key={i.label}>
          <Link href={i.href}>{i.label}</Link>
        </Box>
      ))}
    </Stack>
  );
};
