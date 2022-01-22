import React from "react";
import T from "prop-types";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { authLogin, uiResetError } from "../../../store/actions";
import { uiSelector } from "../../../store/selectors";

//TODO: llevar las redirecciones a redux de AdvertPage y donde corresponda 
//TODO: refactorizar hooks (si los hubiere) en carpeta 'hooks/redux'
//TODO: limpieza y depuración final
//TODO: README.md (corto)


//TODO: parte opcional oficial: si hay tiempo refactorizar el useForm en un Form y en un Input
//TODO: opcional: test de la acción-función loadAdvert 

export function LoginPage({ onLogin, isLoading, error, resetError }) {
  return (
    <>
      <LoginForm  onLogin={onLogin} isLoading={isLoading} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: "red" }}>
          {error.message}
        </div>
      )}
    </>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (credentials) => dispatch(authLogin(credentials, ownProps)),
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
