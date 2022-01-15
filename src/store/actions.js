import {
  // AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  LOAD_ADVERTS_REQUEST,
  LOAD_ADVERTS_SUCCESS,
  LOAD_ADVERTS_FAILURE,
  // ADVERTS_LOADED,
  UI_RESET_ERROR,
} from "./types";

// import { login } from "../components/auth/service";

// export const authLogin = () => {
//   return {
//     type: AUTH_LOGIN,
//   };
// };

export const authLoginRequest = () => {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
};

export const authLoginSuccess = () => {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
};

export const authLoginFailure = (error) => {
  return {
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
  };
};

//This is a thunk-function creator
//esta es una acción de tipo función, llega primero al middleware externo, no a los reducers; gracias a 'thunk', la función recibe dispatch y getState
export const authLogin = ({remember, ...credentials}, location) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(authLoginRequest()); //esta acción, al ser ya un objeto, si le llegará a los reducers, pero pasará primero por los envoltorios de dispatch
    try {
      await api.auth.login(remember, credentials); 
      dispatch(authLoginSuccess());
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};


export const loadAdvertsRequest = () => {
  return {
    type: LOAD_ADVERTS_REQUEST,
  };
};

export const loadAdvertsSuccess = (adverts) => {
  return {
    type: LOAD_ADVERTS_SUCCESS,
    payload: adverts
  };
};

export const loadAdvertsFailure = (error) => {
  return {
    type: LOAD_ADVERTS_FAILURE,
    error: true,
    payload: error,
  };
};

// export const advertsLoaded = (adverts) => {
//   return {
//     type: ADVERTS_LOADED,
//     payload: adverts,
//   };
// };

export const loadAdverts = () => {
  return async (dispatch, getState, { api }) => {
    dispatch(loadAdvertsRequest())
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(loadAdvertsSuccess(adverts))
      console.log(adverts)
    } catch (error) {
      dispatch(loadAdvertsFailure(error));
    }
  };
};

export const uiResetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};
