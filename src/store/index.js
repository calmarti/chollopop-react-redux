import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from "./reducers"; //importa un objeto que contiene todos los exports en reducers.js
// console.log(reducers);
import thunk from "redux-thunk";
import * as auth from "../components/auth/service";
import * as adverts from "../components/adverts/service";

const api = { auth, adverts };

const rootReducer = combineReducers(reducers);
// const rootReducer = combineReducers(reducers.auth, reducers.adverts)

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("***********dispatching action***********", action);
      next(action);
      console.log("**********new state************", store.getState());
    };
  };
};

//middleware 'thunk' hecho a mano
// const thunk = (store) => {
//   return (next) => {
//     return (action) => {
//       if (typeof action === "function") {
//         return action(store.dispatch, store.getState)
//       }
//       return next(action);
//     };
//   };
// };

const configureStore = (preloadedState, { history }) => {
  const middleware = [thunk.withExtraArgument({ api, history }), logger];
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
};

export default configureStore;
