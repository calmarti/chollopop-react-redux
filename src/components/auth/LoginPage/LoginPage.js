import { useHistory, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context';
import { login } from '../../../api/auth';

function LoginPage() {
  const { handleLogin } = useAuthContext();
  const location = useLocation();
  const history = useHistory();

  const handleClick = async () => {
    try {
      await login({
        remember: true,
        email: 'mail@test.com',
        password: 'string',
      });
      handleLogin();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <div>
      LoginPage <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default LoginPage;
