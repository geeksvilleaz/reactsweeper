import React from 'react';
import Header from './components/Header/Header';
import Routes from './components/Routes/Routes';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes />
      </main>

      <footer>footer</footer>
    </div>
  );
}

export default App;
