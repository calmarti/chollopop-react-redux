import { NavLink } from 'react-router-dom';
import { AuthButton } from '../auth';

import './Header.css';

const isExact = match => match && match.isExact;

function Header() {
  return (
    <header>
      Nodepop React
      <nav>
        <ul>
          <li>
            <NavLink to="/adverts" activeClassName="selected">
              Nodepop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adverts/new"
              activeClassName="selected"
              isActive={isExact}
            >
              New advert
            </NavLink>
          </li>
        </ul>
      </nav>
      <AuthButton />
    </header>
  );
}

export default Header;
