import { Switch, Route, Redirect } from 'react-router-dom';

import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { LoginPage } from '../auth';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Switch>
      <Route exact path="/adverts/new">
        <NewAdvertPage />
      </Route>
      <Route exact path="/adverts/:advertId">
        <AdvertPage />
      </Route>
      <Route exact path="/adverts">
        <AdvertsPage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/404">
        <NotFoundPage />
      </Route>
      <Route exact path="/">
        <Redirect to="/adverts" />
      </Route>
      <Route>
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
}

export default App;
