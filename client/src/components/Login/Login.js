import React, { useState } from 'react';
import Modal from '../Modal';
import { TextInput } from '../Input';
import Button from '../Button'
import { serverAPI } from '../../utils/axios';
import "./Login.scss";
import { emailValidate, passwordValidate } from '../../utils/validate';
import { Redirect } from 'react-router-dom';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [redirectRover, setRedirectRover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    console.log(emailValidate(email))
    if (emailValidate(email) && passwordValidate(password)) {
      serverAPI.loginUser(email, password)
        .then(result => {
          console.log(result)
          setRedirectRover(true)
        })
        .catch(err => {
          console.log(err)
        })
    }

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
            <Button type='submit' classNames="margin-top">Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Login;