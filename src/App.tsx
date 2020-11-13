import React from 'react';
import Header from './components/Header/Header';
import Routes from './components/Routes/Routes';
import Footer from './components/Footer/Footer';
import './App.scss';
import './styles/global.scss';

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
