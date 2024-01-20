import AuthAtom from '@/stores/authStore';
import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface PropTypes {
  variant: 'desktop' | 'mobile';
}

const LogInOutButton = ({ variant }: PropTypes): ReactElement => {
  const [authStatus, setAuthStatus] = useAtom(AuthAtom);
  const navigate = useNavigate();
  const isDesktop = variant === 'desktop';

  return authStatus.isLoggedIn ? (
    <Button
      display={isDesktop ? { base: 'none', md: 'flex' } : undefined}
      onClick={() => {
        setAuthStatus({ isLoggedIn: false });
        navigate('/');
      }}
    >
      Logout
    </Button>
  ) : (
    <Button
      display={isDesktop ? { base: 'none', md: 'flex' } : undefined}
      as={Link}
      to={'/login'}
    >
      Login
    </Button>
  );
};

export default LogInOutButton;
