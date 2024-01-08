import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Heading, VStack, Text, Button } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = ({ asRoot }: { asRoot?: boolean }): ReactElement => {
  const error = useRouteError();
  console.error(error);

  return asRoot ? (
    <>
      <NavBar />
      <ErrorContent />
      <Footer />
    </>
  ) : (
    <ErrorContent />
  );
};

const ErrorContent = () => (
  <main>
    <VStack w='80%' mx='auto' h='50dvh' justify='center'>
      <Heading>Oops!</Heading>
      <Text>Something went wrong!</Text>
      <Button colorScheme='purple' variant='outline' as={Link} to='/' mb={12}>
        Zurück
      </Button>
    </VStack>
  </main>
);

export default ErrorPage;
