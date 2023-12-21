import { Restaurant } from '@/types';
import { useEffect, useState } from 'react';

type FetchState = 'initial' | 'loading' | 'success' | 'error';

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [state, setState] = useState<FetchState>('initial');
  const [error, setError] = useState<Error>();

  const fetchRestaurants = () => {
    setState('loading');
    fetch('http://localhost:3003/api/restaurants')
      .then((response) => response.json())
      .then((r) => {
        setRestaurants(r);
        setState('success');
      })
      .catch((e: Error) => {
        setError(e);
        setState('error');
      });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const refresh = () => {
    fetchRestaurants();
  };

  return { restaurants, error, state, refresh };
};

export default useRestaurants;
