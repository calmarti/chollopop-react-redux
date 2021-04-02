import { Link } from 'react-router-dom';
import { useAuthContext } from '../context';

import { logout } from '../../../api/auth';

const AuthButton = () => {
  const { isLogged, handleLogout } = useAuthContext();

  const handleClick = async () => {
    try {
      await logout();
      handleLogout();
    } catch (error) {}
  };

  return isLogged ? (
    <button onClick={handleClick}>Logout</button>
  ) : (
    <Link to="/login">Login</Link>
  );
};

export default AuthButton;
