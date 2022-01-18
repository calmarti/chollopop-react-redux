import React from "react";
import T from "prop-types";

// import { useAuthContext } from '../context';
// import { login } from "../service";
import LoginForm from "./LoginForm";
//import useMutation from "../../../hooks/useMutation";
import { connect, useDispatch } from "react-redux";
import { authLogin, uiResetError } from "../../../store/actions";
import { uiSelector } from "../../../store/selectors";

function LoginPage({
  // history,
  // location,
  handleLogin,
  isLoading,
  error,
  resetError,
}) {
  // const { handleLogin } = useAuthContext();

  // const { isLoading, error, execute, resetError } = useMutation(login);

  //TODO: a tener en cuenta: "cuando demos las acciones asíncronos habrá que mejorar toda la parte de auth"

  //TODO: estas tres líneas deben ir en un custom hook
  // const dispatch = useDispatch();
  // const handleLogin = (authLogin) => {
  //   dispatch(authLogin());
  // };

  // const handleSubmit = (event, credentials) => {
  //     event.preventDefault();
  //     handleLogin(credentials);
  // execute(credentials)
  //   .then(() => handleLogin())
  //   .then(() => {

  // const { from } = location.state || { from: { pathname: "/" } };
  // history.replace(from);
  // };

  return (
    <div>
      <LoginForm handleLogin={handleLogin} isLoading={isLoading} />
      {isLoading && <p>...login in nodepop</p>}

      {error && (
        <div onClick={resetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

/* LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
}; */

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleLogin: (credentials) => dispatch(authLogin(credentials, ownProps)),
    resetError: () => dispatch(uiResetError()),
  };
};
// alternativamente y de forma abreviada:
// const mapDispatchToProps = (dispatch, credentials => {
//   return {
//     handleLogin: authLogin
//   };
// };

const mapStateToProps = (state) => {
  return uiSelector(state);
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;
