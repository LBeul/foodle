import { useCallback, useState } from 'react';

const useDelete = (id: string) => {
  const url = `http://localhost:3003/api/restaurants/${id}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState(null);

  const deleteItem = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch(url, { method: 'DELETE', mode: 'cors' })
      .then((r) => r.json())
      .then((res) => setResponse(res))
      .catch(setError);
    setIsLoading(false);
  }, [url]);

  return { deleteItem, response, isLoading, error };
};

export default useDelete;
