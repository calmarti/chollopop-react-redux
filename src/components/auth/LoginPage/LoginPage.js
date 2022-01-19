import React from "react";
import T from "prop-types";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { authLogin, uiResetError } from "../../../store/actions";
import { uiSelector } from "../../../store/selectors";

//TODO: falta arreglar validación en NewAdvertPage
//TODO: borrar todo lo relacionado con validate en useForm, LoginForm, etc.
//TODO: llevar a redux la llamada al api de tags 

function LoginPage({ handleLogin, isLoading, error, resetError }) {
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

LoginPage.propTypes = {
  handleLogin: T.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleLogin: (credentials) => dispatch(authLogin(credentials, ownProps)),
    resetError: () => dispatch(uiResetError()),
  };
};

const mapStateToProps = (state) => {
  return uiSelector(state);
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default ConnectedLoginPage;
