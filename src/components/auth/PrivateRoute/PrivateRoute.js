import { connect } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getIsLogged, isLoggedSelector } from "../../../store/selectors";
// import { useAuthContext } from '../context';

const PrivateRoute = ({isLogged, ...props}) => {    //la prop IsLogged le llega vía 'connect' (mapStateToProps)
  // const { isLogged } = useAuthContext();
  const location = useLocation();
  
  return isLogged ? (
    <Route {...props} />
    ) : (
      <Redirect to={{ pathname: "/login", state: { from: location } }} />
      );
    };
    
    const mapStateToProps = (state, ownProps) => {
      return {
        isLogged: isLoggedSelector(state),
      };
    };
    


export default connect(mapStateToProps)(PrivateRoute);