import { RestaurantWithoutCoords } from '@/types';
import { useCallback, useState } from 'react';

const usePut = (id: string) => {
  const url = `http://localhost:3003/api/restaurants/${id}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState(null);

  const put = useCallback(
    (payload: RestaurantWithoutCoords) => {
      setIsLoading(true);
      setError(null);
      fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((data) => setResponse(data))
        .catch(setError);
      setIsLoading(false);
    },
    [url]
  );

  return { put, response, isLoading, error };
};

export default usePut;
