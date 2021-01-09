import React from 'react';
import './LandingPage.scss'
import Login from '../../components/Login';
import { connect } from 'react-redux';
import { addNumber } from '../../redux/actions';

const LandgingPage = (props) => {
  console.log(props)
  const {
    addNumber
  } = props;

  const handleClick = () => {
    addNumber(3)
  }

  return (
    <div className="container">
      <h1>This is the landing page</h1>
      <Login />
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

// Maps

const mapStateToProps = state => {
  return {
    number: state.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNumber: num => dispatch(addNumber(num))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandgingPage);