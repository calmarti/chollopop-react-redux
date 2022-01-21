import T from "prop-types";

import useForm from "../../../hooks/useForm";

// const validEmail = ({ email }) => email;
// const validPassword = ({ password }) => password;

function LoginForm({ handleLogin, isLoading }) {
  const {
    formValue: credentials,
    handleChange,
    // validate,
  } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const { email, password, remember } = credentials;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    handleLogin(credentials); //TODO: problem: el AUTH_LOGIN_REQUEST no pasaba el 'isLoading' a true; al cambiar ...state por el nuevo estado se arregló, ¿porqué?
  };

  const disabledButton =
    isLoading || !credentials.email || !credentials.password;

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

      <button
        /* disabled={!validate(validEmail, validPassword)} */ disabled={
          disabledButton
        }
      >
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  handleLogin: T.func.isRequired,
};

export default LoginForm;
