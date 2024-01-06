import {
  Button,
  Card,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';

const LoginPage = () => (
  <Container
    maxW='lg'
    py={{ base: '12', md: '24' }}
    px={{ base: '0', sm: '8' }}
  >
    <Stack spacing='8'>
      <Stack spacing='6'>
        <Center>
          <Image src='./ramen.png' boxSize={16} mr={2} />
        </Center>
        <Center>
          <Heading size={{ base: 'md', md: 'xl' }}>Admin-Login</Heading>
        </Center>
      </Stack>
      <Card py={8} px={10} variant={{ base: 'none', sm: 'outline' }}>
        <Stack spacing='6'>
          <Stack spacing='5'>
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input id='email' type='email' />
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input id='password' type='password' />
            </FormControl>
          </Stack>

          <Button>Weiter als Admin</Button>
        </Stack>
      </Card>
    </Stack>
  </Container>
);

export default LoginPage;
