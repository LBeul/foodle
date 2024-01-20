import AuthAtom from '@/stores/authStore';
import { useAtomValue } from 'jotai';
import { ReactElement } from 'react';
import { Navigate } from 'react-router';

interface PropTypes {
  children: React.ReactNode;
}

const ProtectedPage = ({ children }: PropTypes): ReactElement => {
  const { isLoggedIn } = useAtomValue(AuthAtom);
  return isLoggedIn ? <>{children}</> : <Navigate to='/' replace />;
};

export default ProtectedPage;
