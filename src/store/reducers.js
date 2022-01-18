import {
  // AUTH_LOGIN,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_REQUEST,
  // AUTH_LOGIN_FAILURE,
  UI_RESET_ERROR,
  LOAD_ADVERTS_REQUEST,
  LOAD_ADVERTS_SUCCESS,
  // LOAD_ADVERTS_FAILURE,
  LOAD_ADVERT_REQUEST,
  LOAD_ADVERT_SUCCESS,
  // LOAD_ADVERT_FAILURE,
  CREATE_ADVERT_SUCCESS,
  DELETE_ADVERT_SUCCESS,
} from "./types";

const defaultState = {
  auth: false,
  adverts: { loaded: false, data: [] },
  ui: { isLoading: false, error: null },
};

// export const reducer = (state = defaultState, action) => {
//   //notar que, como el reducer debe ser función pura, no modifico el state (uso spread operator)
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return { ...state, auth: true };
//     case AUTH_LOGOUT:
//       return { ...state, auth: false };
//     case ADVERTS_LOADED:
//       return { ...state, adverts: action.payload };
//     default:
//       return state;
//   }
// };

export const auth = (authState = defaultState.auth, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
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
    case LOAD_ADVERTS_REQUEST:
    case LOAD_ADVERT_REQUEST:
      return {
        isLoading: true,
        error: null,
      };
    case AUTH_LOGIN_SUCCESS:
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
      return 
    default:
      return advertsState;
  }
};

// combineReducer hecho "a mano"
// const combinedReducer = (state = defaultState, action) => {
//   return {
//     auth: auth(state.auth, action),
//     adverts: adverts(state.adverts, action),
//   };
// };

//export default combineReducers = ({auth: auth, adverts: adverts})   //método importado de redux, recibe un objeto cuya forma es igual a la de mi estado
