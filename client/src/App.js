import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// components
import Header from './components/Header';
// pages
import LandingPage from './pages/LandingPage';
import RoverPage from './pages/RoverPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' render={props => <LandingPage {...props} />} />
          <Route exact path='/rovers' render={props => <RoverPage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
