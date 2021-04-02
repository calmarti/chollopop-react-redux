import { useHistory, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context';

function LoginPage() {
  const { handleLogin } = useAuthContext();
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    handleLogin();
    const { from } = location.state || { from: { pathname: '/' } };
    history.replace(from);
  };

  return (
    <div>
      LoginPage <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default LoginPage;
