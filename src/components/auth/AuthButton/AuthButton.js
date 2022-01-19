import { Link } from "react-router-dom";
import T from "prop-types";
import { ConfirmationButton } from "../../common";
import { authLogout } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedSelector } from "../../../store/selectors";

const AuthButton = () => {
  const isLogged = useSelector(isLoggedSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const handleLogoutConfirm = () => {
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

AuthButton.propTypes = {
  isLogged: T.bool,
};


export default AuthButton;
