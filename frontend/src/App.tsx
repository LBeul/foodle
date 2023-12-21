import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import NavBar from './components/NavBar';
import useRestaurants from './hooks/useRestaurants';
import { useEffect } from 'react';

function App() {
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
      <NavBar />
      <VStack w='80%' mx='auto'>
        {state === 'loading' ? (
          <Spinner thickness='4px' speed='0.65s' color='purple.400' size='xl' />
        ) : (
          <Box>
            {state === 'error' ? (
              <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            ) : (
              <RestaurantsList restaurants={restaurants} />
            )}
          </Box>
        )}
      </VStack>
    </main>
  );
}

export default App;
