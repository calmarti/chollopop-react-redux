import React from 'react';
import T from 'prop-types';

import { useAuthContext } from '../context';
import { login } from '../service';
import LoginForm from './LoginForm';
import useMutation from '../../../hooks/useMutation';

function LoginPage({ location, history }) {
  const { handleLogin } = useAuthContext();
  const { isLoading, error, execute, resetError } = useMutation(login);

  const handleSubmit = credentials => {
    execute(credentials)
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

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default LoginPage;
