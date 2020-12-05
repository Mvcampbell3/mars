import React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <h1 className="brand">Mars Rovers</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/rovers'>Rovers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;