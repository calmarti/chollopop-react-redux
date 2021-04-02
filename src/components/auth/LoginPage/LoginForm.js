import React from 'react';
import T from 'prop-types';

const canSubmit = ({ email, password }) =>
  [
    // valid email
    !!email,
    // valid password
    !!password,
  ].every(validation => validation); // all validations pass

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    remember: false,
  });
  const { email, password, remember } = credentials;

  const handleChange = ev => {
    setCredentials(oldCredentials => ({
      ...oldCredentials,
      [ev.target.name]:
        ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value,
    }));
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="remember"
        checked={remember}
        onChange={handleChange}
      />
      <button disabled={!canSubmit(credentials)}>Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
