import T from "prop-types";

import useForm from "../../../hooks/useForm";

function LoginForm({ onLogin, isLoading }) {
  const {
    formValue: credentials,
    setFormValue,
  } = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const { email, password, remember } = credentials;

  //Nota: función 'handleChange' específica para LoginForm para poder hacer el test de React-Testing-Library

  const handleChange = ({ target: { name, value} }) => {
    setFormValue((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onLogin(credentials); 
  };


  const disabledButton =
    isLoading || !credentials.email || !credentials.password;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input name="email" value={email} onChange={handleChange} />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>

      <label>
        <span>Remember password</span>
        <input
          type="checkbox"
          name="remember"
          checked={remember}
          onChange={handleChange}
        />
      </label>

      <button
        disabled={
          disabledButton
        }
      >
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onLogin: T.func.isRequired,
};

export default LoginForm;
