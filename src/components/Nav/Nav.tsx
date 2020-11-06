import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

interface IProps {}

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
