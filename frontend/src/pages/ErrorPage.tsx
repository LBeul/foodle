import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Heading, VStack, Text, Button } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = (): ReactElement => {
  const error = useRouteError();
  console.error(error);

  return (
    <main>
      <NavBar />
      <VStack w='80%' mx='auto' h='50dvh' justify='center'>
        <Heading>Oops!</Heading>
        <Text>Something went wrong!</Text>
        <Button colorScheme='purple' variant='outline' as={Link} to='/' mb={12}>
          Zurück
        </Button>
        <Footer />
      </VStack>
    </main>
  );
};

export default ErrorPage;
