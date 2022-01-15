import { Link } from "react-router-dom";
import T from "prop-types";

import { ConfirmationButton } from "../../common";
// import { AuthConsumer } from '../context';
import { logout } from "../service";
import useMutation from "../../../hooks/useMutation";
import { authLogout } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedSelector } from "../../../store/selectors";

const AuthButton = () => {
  //TODO: Estas cuatro lineas podrían ir en un custom hook que tenga como side-effect (o devuelva) el dispatch(authLogout)
  //y luego que el handleLogout ejecute al custom hook
  //o, (mío) alternativamente, que todo esté en un custom hook (incluido el handleLogout)

  const isLogged = useSelector(isLoggedSelector);
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout().then(() => dispatch(authLogout()));
  };

  const mutation = useMutation(logout);

  const handleLogoutConfirm = async () => {
    await mutation.execute();
    handleLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

//TODO: arreglar lo que haya que arreglar en la proptype para que no se queje de que es handleLogout es undefined
// AuthButton.propTypes = {
//   handleLogout: T.func.isRequired,
//   isLogged: T.bool,
// };

//TODO: arreglar esto también para que en react dev tools isLogged no salga a false cuando en Private Route está a true!
// AuthButton.defaultProps = {
//   isLogged: false,
// };

// <AuthConsumer>{auth=> <AuthButton {...auth} {...props} />}</AuthConsumer>

export default AuthButton;
