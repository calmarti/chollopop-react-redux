import { Link } from 'react-router-dom';
import { useAuthContext } from '../context';

const AuthButton = () => {
  const { isLogged, handleLogout } = useAuthContext();

  const handleClick = () => {
    handleLogout();
  };

  return isLogged ? (
    <button onClick={handleClick}>Logout</button>
  ) : (
    <Link to="/login">Login</Link>
  );
};

export default AuthButton;
