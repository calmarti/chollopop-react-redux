import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_REQUEST,

  // AUTH_LOGIN_FAILURE,
  LOAD_ADVERTS_REQUEST,
  LOAD_ADVERTS_SUCCESS,
  // LOAD_ADVERTS_FAILURE,
  LOAD_ADVERT_REQUEST,
  LOAD_ADVERT_SUCCESS,
  // LOAD_ADVERT_FAILURE,
  CREATE_ADVERT_REQUEST,
  CREATE_ADVERT_SUCCESS,
  // CREATE_ADVERT_FAILURE,
  DELETE_ADVERT_REQUEST,
  DELETE_ADVERT_SUCCESS,
  // DELETE_ADVERT_FAILURE,
  UI_RESET_ERROR,   //TODO: ¿esto de donde salió?
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_REQUEST,
} from "./types";

const defaultState = {
  auth: false,
  adverts: { loaded: false, data: [] },
  ui: { isLoading: false, error: null },
};

export const auth = (authState = defaultState.auth, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT_SUCCESS:
      return false;
    default:
      return authState;
  }
};

export const ui = (uiState = defaultState.ui, action) => {
  if (action.error) {
    return {
      isLoading: false,
      error: action.payload,
    };
  }
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_LOGOUT_REQUEST:
    case LOAD_ADVERTS_REQUEST:
    case LOAD_ADVERT_REQUEST:
    case CREATE_ADVERT_REQUEST:
    case DELETE_ADVERT_REQUEST:
      return {
        isLoading: true,
        error: null,
      };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_LOGOUT_SUCCESS:
    case LOAD_ADVERTS_SUCCESS:
    case LOAD_ADVERT_SUCCESS:
      return {
        isLoading: false,
        error: null,
      };
    case UI_RESET_ERROR:
      return {
        isLoading: false,
        error: null,
      };
    default:
      return uiState;
  }
};

export const adverts = (advertsState = defaultState.adverts, action) => {
  switch (action.type) {
    case LOAD_ADVERTS_SUCCESS:
      return { loaded: true, data: action.payload };
    case LOAD_ADVERT_SUCCESS:
    case CREATE_ADVERT_SUCCESS:
      console.log("I reached the reducer");
      return { ...advertsState, data: [...advertsState.data, action.payload] };
    case DELETE_ADVERT_SUCCESS:
      return { ...advertsState, data: action.payload };
    default:
      return advertsState;
  }
};
