import { AuthStatus, LoginCredentials } from '@/types';
import { useEffect, useState } from 'react';

type FetchState = 'initial' | 'loading' | 'success' | 'error';

const useAuthRequest = ({ username, password }: LoginCredentials) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('logged-out');
  const [fetchState, setFetchState] = useState<FetchState>('initial');
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const makeAuthRequest = () => {
      setFetchState('loading');
      fetch('http://localhost:3003/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((content) => {
          setAuthStatus(content);
          setFetchState('success');
        })
        .catch((e: Error) => {
          setError(e);
          setFetchState('error');
        });
    };

    makeAuthRequest();
  }, [password, username]);

  return { authStatus, error, fetchState };
};

export default useAuthRequest;
