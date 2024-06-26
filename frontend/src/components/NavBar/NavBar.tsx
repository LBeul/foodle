import {
  Box,
  Flex,
  IconButton,
  Stack,
  Collapse,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Heading,
  Image,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  MdOutlineMenu,
  MdClose,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { NavItem } from '@/types';
import LogInOutButton from '../LoginOutButton';

export default function NavBar(): ReactElement {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const NavItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
  ];

  return (
    <Box
      as='nav'
      role='navigation'
      zIndex={2}
      bgColor='var(--chakra-colors-chakra-body-bg)'
    >
      <Flex minH='60px' align='center' width='80%' mx='auto' my={5}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          display={{ base: 'flex', md: 'none' }}
          alignItems='center'
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <MdClose w={3} h={3} /> : <MdOutlineMenu w={5} h={5} />
            }
            aria-label='Toggle Navigation'
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          alignItems='stretch'
        >
          <Image src='./ramen.png' boxSize={8} mr={2} />
          <Heading
            size='lg'
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
          >
            Foodle
          </Heading>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav items={NavItems} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify='flex-end' direction='row'>
          <LogInOutButton variant='desktop' />
          <IconButton
            onClick={toggleColorMode}
            borderRadius='full'
            aria-label='toggle-theme'
          >
            {colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
          </IconButton>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav items={NavItems} />
      </Collapse>
    </Box>
  );
}
