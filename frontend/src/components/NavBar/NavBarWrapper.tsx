import { Outlet } from 'react-router';
import NavBar from '.';

const NavBarWrapper = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavBarWrapper;
