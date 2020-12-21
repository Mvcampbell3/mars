import React, { useState } from 'react';
import Modal from '../Modal';
import { TextInput } from '../Input';
import Button, { TextButton } from '../Button'
import { serverAPI } from '../../utils/axios';
import "./Login.scss";
import { emailValidate, passwordValidate } from '../../utils/validate';
import { Redirect } from 'react-router-dom';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [redirectRover, setRedirectRover] = useState(false);
  const [action, setAction] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    if (emailValidate(email) && passwordValidate(password)) {
      console.log('passed validation')
      const actionFunction = action === 'login' ? serverAPI.loginUser : serverAPI.createUser;
      actionFunction(email, password)
        .then(result => {
          console.log(result)
          // setRedirectRover(true)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log('failed validation')
    }
  }

  const toggleAction = (e) => {
    e.preventDefault()
    setAction(action === 'login' ? 'signup' : 'login');
  }

  const ModalProps = {
    showModal: showLoginModal,
    setShowModal: setShowLoginModal
  }

  return (
    <div className="login-container">
      {redirectRover && <Redirect to='/rovers' />}
      <Button type='button' handleClick={e => setShowLoginModal(!showLoginModal)}>Login</Button>
      <Modal {...ModalProps}>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h3 className="loginTitle">{action === 'login' ? "Login" : "Signup"}</h3>
            <TextInput
              label="Email"
              val={email}
              handleChange={setEmail}
              id="email-login"
              name="email"
              placeholder="example@email.com"
              type="email"
            />
            <TextInput
              label="Password"
              val={password}
              handleChange={setPassword}
              id="password-login"
              name="password"
              placeholder="********"
              type="password"
            />
            <div className="action-holder">
              <Button type='submit'>
                {action === 'login'
                  ? 'Login'
                  : 'Sign Up'
                }
              </Button>
              <TextButton handleClick={toggleAction}>
                {action === 'login'
                  ? 'I need to create an account'
                  : 'I already have an account'
                }
              </TextButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Login;