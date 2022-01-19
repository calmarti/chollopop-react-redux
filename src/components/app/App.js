import React from "react";
import T from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { AdvertPage, AdvertsPage, NewAdvertPage } from "../adverts";
import { LoginPage, PrivateRoute } from "../auth";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <Switch>
      <PrivateRoute exact path="/adverts/new" component={NewAdvertPage} />
      <PrivateRoute exact path="/adverts/:advertId">
        {(routerProps) => <AdvertPage {...routerProps} />}
      </PrivateRoute>
      <PrivateRoute exact path="/adverts">
        <AdvertsPage />
      </PrivateRoute>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/404">
        <NotFoundPage />
      </Route>
      <Route exact path="/">
        <Redirect to="/adverts" />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
}

App.propTypes = {
  isInitiallyLogged: T.bool,
};

App.defaultProps = {
  isInitiallyLogged: false,
};

export default App;
