import React from 'react';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import './Header.scss';

interface IProps {}

const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo />

      <Nav />
    </header>
  );
};

export default Header;
