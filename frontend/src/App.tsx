import { useEffect, useState } from 'react';
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import { Spinner, VStack } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import { Restaurant } from './types';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/restaurants');
        const restaurants = await response.json();
        setRestaurants(restaurants);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <main>
      <NavBar />
      <VStack w='80%' mx='auto'>
        {restaurants.length ? (
          <RestaurantsList restaurants={restaurants} />
        ) : (
          <Spinner thickness='4px' speed='0.65s' color='purple.400' size='xl' />
        )}
      </VStack>
    </main>
  );
}

export default App;
