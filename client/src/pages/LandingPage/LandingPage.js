import React from 'react';
import './LandingPage.scss'
import Login from '../../components/Login';

const LandgingPage = () => {
  return (
    <div className="container">
      <h1>This is the landing page</h1>
      <Login />
    </div>
  );
}

export default LandgingPage;