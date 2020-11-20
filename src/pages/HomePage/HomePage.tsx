import React from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';
import './HomePage.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Gameboard />
    </div>
  )
};

export default HomePage;