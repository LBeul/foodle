import { useEffect, useState } from 'react';
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import { Spinner, VStack } from '@chakra-ui/react';
import NavBar from './components/NavBar';

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
      <NavBar />
      <VStack w='80%' mx='auto'>
        {restaurants.length ? (
          <RestaurantsList restaurants={restaurants} />
        ) : (
          <Spinner
            thickness='4px'
            speed='0.65s'
            colorScheme='purple'
            size='xl'
          />
        )}
      </VStack>
    </main>
  );
}

export default App;
