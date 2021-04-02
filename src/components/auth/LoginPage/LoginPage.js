import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuthContext } from '../context';
import { login } from '../../../api/auth';
import LoginForm from './LoginForm';

function LoginPage() {
  const { handleLogin } = useAuthContext();
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = React.useState(null);

  const handleSubmit = async credentials => {
    try {
      await login(credentials);
      handleLogin();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;
