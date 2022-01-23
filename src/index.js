import React from "react";
import ReactDOM from "react-dom";
import { configureClient } from "./api/client";
import storage from "./utils/storage";
import "./index.css";
import App from "./components/app";
import Root from "./Root";
import configureStore from "./store";
import { createBrowserHistory } from "history";

const accessToken = storage.get("auth");

const history = createBrowserHistory();

configureClient({ accessToken });
const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
);
