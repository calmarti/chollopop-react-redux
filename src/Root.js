// import { BrowserRouter as Router } from "react-router-dom";
import { Router } from "react-router-dom";
import { Provider, connect, useDispatch, useSelector } from "react-redux";

const Root = ({ children, store, history }) => (
  <Provider store={store}>
    <Router history={history}>{children}</Router>
  </Provider>
);

// const Root = ({ children, store }) => {
//   return (
//     <Provider store={store}>
//       <Router>{children}</Router>
//     </Provider>
//   );
// };

export default Root;
