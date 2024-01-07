import AuthAtom from '@/stores/authStore';
import { LoginCredentials } from '@/types';
import {
  Button,
  Card,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [authStatus, setAuthStatus] = useAtom(AuthAtom);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const toast = useToast();

  const onSubmit: SubmitHandler<LoginCredentials> = async (
    data: LoginCredentials
  ) => {
    fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status.toString());
      })
      .then((details) => {
        setAuthStatus({
          isLoggedIn: true,
          ...details,
        });
        toast({
          title: 'Nice!',
          description: 'Du wurdest erfolgreich eingeloggt!',
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((errorCode: Error) => {
        setAuthStatus({ isLoggedIn: false });
        toast({
          title: 'Ooops!',
          description:
            errorCode.message === '401'
              ? 'Diese Username/Passwort Kombi existiert nicht in der Datenbank!'
              : `Der Server antwortet mit Fehlercode ${errorCode.message}`,
          position: 'top',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => reset());
  };

  return (
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
          {authStatus.isLoggedIn ? (
            <Stack align='center'>
              <Center bg='green' boxSize={12} borderRadius='full'>
                <Icon as={FaCheck} h={8} w={8} fill='white' bg='success' />
              </Center>
              <Text fontSize='lg'>Eingeloggt als {authStatus.username}</Text>
            </Stack>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing='5'>
                <FormControl isInvalid={Boolean(errors.username)}>
                  <FormLabel htmlFor='username'>Username</FormLabel>
                  <Input
                    id='username'
                    type='text'
                    defaultValue=''
                    {...register('username', { required: 'Pflichtangabe' })}
                  />
                  <FormErrorMessage>
                    {errors?.username?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <FormLabel htmlFor='password'>Passwort</FormLabel>
                  <Input
                    id='password'
                    type='password'
                    defaultValue=''
                    {...register('password', {
                      required: 'Pflichtangabe',
                      minLength: {
                        value: 8,
                        message: 'Password muss mindestens 8 Zeichen lang sein',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Button
                w='full'
                mt={12}
                colorScheme='purple'
                isLoading={isSubmitting}
                type='submit'
                isDisabled={Object.keys(errors).length > 0}
              >
                Weiter als Admin
              </Button>
            </form>
          )}
          <Button w='full' mt={6} as={Link} to='/'>
            Zurück zur Homepage
          </Button>
        </Card>
      </Stack>
    </Container>
  );
};

export default LoginPage;
