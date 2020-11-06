import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AboutPage from '../../pages/AboutPage/AboutPage';
import HomePage from '../../pages/HomePage/HomePage';

interface IProps {}

const Routes: React.FC = () => {
  return (
    <div className="routes">
      <Switch>
        <Route path="/about">
          <AboutPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
