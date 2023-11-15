import { useEffect, useState } from 'react';
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import { Heading, Spinner, VStack } from '@chakra-ui/react';

function App() {
  const [restaurants, setRestaurants] = useState([]);

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
      <VStack w='80%' mx='auto'>
        <Heading my={4}>Foodle</Heading>

        {restaurants.length ? (
          <RestaurantsList restaurants={restaurants} />
        ) : (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='purple.100'
            color='purple.500'
            size='xl'
          />
        )}
      </VStack>
    </main>
  );
}

export default App;
