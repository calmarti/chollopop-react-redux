import React from "react";
import ReactDOM from "react-dom";
import { configureClient } from "./api/client";
import storage from "./utils/storage";
import "./index.css";
import App from "./components/app";
import Root from "./Root";
import configureStore from "./store";
import { createBrowserHistory } from "history";
// import { authLogin } from "./store/actions";
// import { authLogout } from "./store/actions";

// const render = () => console.log(store.getState());
// store.subscribe(render);
// store.dispatch(authLogin());
// store.dispatch(authLogout());

//TODO: no olvidar implementar el spinner (isLoading)
//TODO: hacer la redireccion de los 401, 404 en los thunks y pasarle el error como prop a los componentes SOLO si lo van a pintar

const accessToken = storage.get("auth");

const history = createBrowserHistory();

configureClient({ accessToken });
const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history} >
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
);
