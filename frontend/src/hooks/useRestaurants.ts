import { FetchState, Restaurant } from '@/types';
import { useEffect, useState } from 'react';

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('initial');
  const [error, setError] = useState<Error>();

  const fetchRestaurants = () => {
    setFetchState('loading');
    fetch('http://localhost:3003/api/restaurants')
      .then((response) => response.json())
      .then((r) => {
        setRestaurants(r);
        setFetchState('success');
      })
      .catch((e: Error) => {
        setError(e);
        setFetchState('error');
      });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const refresh = () => {
    fetchRestaurants();
  };

  return { restaurants, error, fetchState, refresh };
};

export default useRestaurants;
