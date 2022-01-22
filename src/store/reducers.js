import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_REQUEST,
  LOAD_ADVERTS_REQUEST,
  LOAD_ADVERTS_SUCCESS,
  LOAD_ADVERT_REQUEST,
  LOAD_ADVERT_SUCCESS,
  CREATE_ADVERT_REQUEST,
  CREATE_ADVERT_SUCCESS,
  DELETE_ADVERT_REQUEST,
  DELETE_ADVERT_SUCCESS,
  UI_RESET_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_REQUEST,
  LOAD_TAGS_SUCCESS,
} from "./types";

export const defaultState = {
  auth: false,
  adverts: { loaded: false, data: [] },
  ui: { isLoading: false, error: null },
  tags: [],
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
      return { ...advertsState, data: [...advertsState.data, action.payload] };
    case DELETE_ADVERT_SUCCESS:
      return { ...advertsState, data: action.payload };
    default:
      return advertsState;
  }
};

export const tags = (tagsState = defaultState.tags, action) => {
  switch (action.type) {
    case LOAD_TAGS_SUCCESS:
      return action.payload;
    default:
      return [tagsState];
  }
};
