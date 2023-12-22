import { Heading, VStack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = (): ReactElement => {
  const error = useRouteError();
  console.error(error);

  return (
    <main>
      <VStack w='80%' mx='auto' h='50dvh' justify='center'>
        <Heading>Oops!</Heading>
        <Text>Something went wrong!</Text>
      </VStack>
    </main>
  );
};

export default ErrorPage;
