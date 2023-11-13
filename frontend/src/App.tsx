import { useState } from 'react';
import './App.css';
import RestaurantsList from './components/RestaurantsList';

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
    <>
      <div style={{ fontSize: '5rem' }}>🍜</div>
      <h1>Foodle</h1>
      <p>Work In Progress...</p>
      <button onClick={fetchRestaurants}>Fetch restaurants</button>
      {restaurants.length ? (
        <RestaurantsList restaurants={restaurants} />
      ) : (
        <div>Click to load restaurants</div>
      )}
    </>
  );
}

export default App;
