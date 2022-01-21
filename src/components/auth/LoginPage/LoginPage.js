import React from "react";
import T from "prop-types";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { authLogin, uiResetError } from "../../../store/actions";
import { uiSelector } from "../../../store/selectors";

//TODO: llevar las redirecciones a redux donde corresponda
//TODO: borrar todo lo relacionado con validate en useForm, LoginForm, etc.
//TODO: llevar a redux la llamada al api de tags
//TODO: refactorizar hooks (si los hubiere) en carpeta 'hooks/redux'
//TODO: refactorizar fichero de actions en ficheros más pequeños en una carpeta 'actions'
//TODO: limpieza y depuración final
//TODO: README.md (corto)
//TODO: si hay tiempo mirar que cosas de la clase 5 se pueden incorporar (¿un useReducer?)
//TODO: TESTING:
//TODO: caso del deleteAdvert en test del reducer
//TODO: f. Comprobar el funcionamiento de un componente que ejecuta una
//acción del store, mockeando la acción.
//TODO: parte opcional oficial
//TODO: opcional: test de la acción-función loadAdvert 

function LoginPage({ handleLogin, isLoading, error, resetError }) {
  return (
    <>
      <LoginForm  handleLogin={handleLogin} isLoading={isLoading} />
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
