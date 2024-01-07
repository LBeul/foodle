import { NavItem } from '@/types';
import { Box, Link, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export const DesktopNav = ({ items }: { items: NavItem[] }): ReactElement => {
  return (
    <Stack direction='row' spacing={4} alignItems='center'>
      {items.map((i) => (
        <Box key={i.label}>
          <Link to={i.href} as={NavLink}>
            {i.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};
