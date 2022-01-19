import { advert } from "../components/adverts/propTypes";
import {
  loadAdvertSelector,
  loadAdvertsSelector,
  deleteAdvertSelector,
  loadedSelector,
} from "./selectors";
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  LOAD_ADVERTS_REQUEST,
  LOAD_ADVERTS_SUCCESS,
  LOAD_ADVERTS_FAILURE,
  LOAD_ADVERT_REQUEST,
  LOAD_ADVERT_SUCCESS,
  LOAD_ADVERT_FAILURE,
  CREATE_ADVERT_REQUEST,
  CREATE_ADVERT_SUCCESS,
  CREATE_ADVERT_FAILURE,
  DELETE_ADVERT_REQUEST,
  DELETE_ADVERT_SUCCESS,
  DELETE_ADVERT_FAILURE,
  UI_RESET_ERROR,
} from "./types";


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


export const authLogin = ({ remember, ...credentials }, location) => {
  return async (dispatch, getState, { api, history }) => {
    dispatch(authLoginRequest()); 
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
    payload: adverts,
  };
};

export const loadAdvertsFailure = (error) => {
  return {
    type: LOAD_ADVERTS_FAILURE,
    error: true,
    payload: error,
  };
};



export const loadAdverts = () => {
  return async (dispatch, getState, { api }) => {
    const loaded = loadedSelector(getState());
    if (loaded) {
      return;
    }
    dispatch(loadAdvertsRequest());
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(loadAdvertsSuccess(adverts));
    } catch (error) {
      dispatch(loadAdvertsFailure(error));
    }
  };
};

export const loadAdvertRequest = () => {
  return {
    type: LOAD_ADVERT_REQUEST,
  };
};

export const loadAdvertSuccess = (advert) => {
  return {
    type: LOAD_ADVERT_SUCCESS,
    payload: advert,
  };
};

export const loadAdvertFailure = (error) => {
  return {
    type: LOAD_ADVERT_FAILURE,
    error: true,
    payload: error,
  };
};

export const loadAdvert = (advertId) => {
  return async (dispatch, getState, { api }) => {
    const advert = loadAdvertSelector(getState(), advertId);
    if (advert) {
      return;
    }
    try {
      dispatch(loadAdvertRequest());
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(loadAdvertSuccess(advert));
    } catch (error) {
      dispatch(loadAdvertFailure(error)); //OJO: "este caso de error puede ser importante de cara a la práctica"
      
    }
  };
};

export const createAdvertRequest = () => {
  return {
    type: CREATE_ADVERT_REQUEST,
  };
};

export const createAdvertSuccess = (advert) => {
  return {
    type: CREATE_ADVERT_SUCCESS,
    payload: advert,
  };
};

export const createAdvertFailure = (error) => {
  return {
    type: CREATE_ADVERT_FAILURE,
    error: true,
    payload: error,
  };
};

export const createAdvert = (input) => {
  return async (dispatch, getState, { api, history }) => {
    try {
      dispatch(createAdvertRequest());
      const advert = await api.adverts.createAdvert(input);
      dispatch(createAdvertSuccess(advert));
      history.push(`/adverts/${advert.id}`);
    } catch (error) {
      dispatch(createAdvertFailure(error))
    }
  };
};

export const deleteAdvertRequest = () => {
  return {
    type: DELETE_ADVERT_REQUEST,
  };
};

export const deleteAdvertSuccess = (advertsMinusOne) => {
  return {
    type: DELETE_ADVERT_SUCCESS,
    payload: advertsMinusOne,
  };
};

export const deleteAdvertFailure = (error) => {
  return {
    type: DELETE_ADVERT_FAILURE,
    error: true,
    payload: error,
  };
};

export const deleteAdvert = (advertId) => {
  return async (dispatch, getState, { api, history }) => {
    try {
      // dispatch(deleteAdvertRequest());
      const advertsMinusOne = deleteAdvertSelector(getState(), advertId);
      await api.adverts.deleteAdvert(advertId);
      dispatch(deleteAdvertSuccess(advertsMinusOne));
      console.log("estado: ", getState().adverts);
      history.push("/");
    } catch (error) {
      dispatch(deleteAdvertFailure(error));
    }
  };
};

export const uiResetError = () => {
  return {
    type: UI_RESET_ERROR,
  };
};
