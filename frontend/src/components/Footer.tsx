import { Center, Container, Text } from '@chakra-ui/react';

const Footer = () => (
  <Container as='footer' pb={8} pt={{ base: 0, sm: 8 }}>
    <Center>
      <Text fontSize='sm' color='fg.subtle'>
        &copy; {new Date().getFullYear()} Foodle
      </Text>
    </Center>
  </Container>
);

export default Footer;
