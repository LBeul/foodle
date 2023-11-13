import { useState } from 'react';
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/restaurants');
      const restaurants = await response.json();
      setRestaurants(restaurants);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <VStack w='80%' mx='auto'>
        <Heading my={4}>Foodle</Heading>
        <Button
          onClick={fetchRestaurants}
          my={4}
          variant='outline'
          colorScheme='purple'
        >
          Fetch restaurants
        </Button>
        {restaurants.length ? (
          <RestaurantsList restaurants={restaurants} />
        ) : (
          <Text>Click to load restaurants</Text>
        )}
      </VStack>
    </main>
  );
}

export default App;
