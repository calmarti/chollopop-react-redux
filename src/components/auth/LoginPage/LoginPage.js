import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuthContext } from '../context';
import usePromise from '../../../hooks/usePromise';
import { login } from '../../../api/auth';
import LoginForm from './LoginForm';

function LoginPage() {
  const { handleLogin } = useAuthContext();
  const location = useLocation();
  const history = useHistory();
  const { isPending: isLoading, error, execute, resetError } = usePromise();

  const handleSubmit = credentials => {
    execute(login(credentials))
      .then(handleLogin)
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
