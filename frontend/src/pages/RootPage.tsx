import RestaurantsList from '@/components/RestaurantsList';
import useRestaurants from '@/hooks/useRestaurants';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function RootPage() {
  const { restaurants, error, fetchState, refresh } = useRestaurants();

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
        {fetchState === 'loading' ? (
          <>
            <Text mb={5}>Loading Items...</Text>
            <Spinner
              thickness='4px'
              speed='0.65s'
              color='purple.400'
              size='xl'
            />
          </>
        ) : (
          <>
            {fetchState === 'error' ? (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            ) : (
              <>
                <RestaurantsList restaurants={restaurants} />
                <Button as={Link} to='/new-restaurant' mb={8}>
                  Restaurant hinzufügen
                </Button>
              </>
            )}
          </>
        )}
      </VStack>
    </main>
  );
}

export default RootPage;
