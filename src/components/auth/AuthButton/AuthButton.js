import { Link } from 'react-router-dom';
import T from 'prop-types';

import { ConfirmationButton } from '../../common';
import { AuthConsumer } from '../context';
import { logout } from '../service';
import useMutation from '../../../hooks/useMutation';

const AuthButton = ({ handleLogout, isLogged }) => {
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

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const ConnectedAuthButton = props => (
  <AuthConsumer>{auth => <AuthButton {...auth} {...props} />}</AuthConsumer>
);

export default ConnectedAuthButton;
