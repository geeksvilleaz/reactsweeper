import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

interface IProps {}

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link to="/">ReactSweeper</Link>
    </div>
  );
};

export default Logo;
