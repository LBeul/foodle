import RestaurantsList from '@/components/RestaurantsList';
import useRestaurants from '@/hooks/useRestaurants';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

function RootPage() {
  const { restaurants, error, state, refresh } = useRestaurants();

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return (
    <main>
      <VStack w='80%' mx='auto'>
        {state === 'loading' ? (
          <Spinner thickness='4px' speed='0.65s' color='purple.400' size='xl' />
        ) : (
          <>
            {state === 'error' ? (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            ) : (
              <RestaurantsList restaurants={restaurants} />
            )}
            <Button as='a' href='/new-restaurant'>
              Restaurant hinzufügen
            </Button>
          </>
        )}
      </VStack>
    </main>
  );
}

export default RootPage;
