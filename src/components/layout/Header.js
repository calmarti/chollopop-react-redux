import { NavLink } from 'react-router-dom';

const isExact = match => match && match.isExact;

function Header() {
  return (
    <header>
      Nodepop React
      <nav>
        <ul>
          <li>
            <NavLink
              to="/adverts"
              activeClassName="selected"
              isActive={isExact}
            >
              Nodepop
            </NavLink>
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
    </header>
  );
}

export default Header;
