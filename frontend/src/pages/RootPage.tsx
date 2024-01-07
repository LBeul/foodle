import RestaurantsList from '@/components/RestaurantsList';
import useRestaurants from '@/hooks/useRestaurants';
import AuthAtom from '@/stores/authStore';
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
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function RootPage() {
  const { restaurants, error, state, refresh } = useRestaurants();
  const { isLoggedIn } = useAtomValue(AuthAtom);

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
          <>
            <Text mb={5}>Loading Items</Text>
            <Spinner
              thickness='4px'
              speed='0.65s'
              color='purple.400'
              size='xl'
            />
          </>
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
            {isLoggedIn && (
              <Button
                as={Link}
                to='/new-restaurant'
                colorScheme='purple'
                variant='outline'
              >
                Restaurant hinzufügen
              </Button>
            )}
          </>
        )}
      </VStack>
    </main>
  );
}

export default RootPage;
