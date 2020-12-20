import React, { useState } from 'react';
import Modal from '../Modal';
import { TextInput } from '../Input';
import Button from '../Button'
import { serverAPI } from '../../utils/axios';
import "./Login.scss";

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    serverAPI.loginUser(email, password)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const ModalProps = {
    showModal: showLoginModal,
    setShowModal: setShowLoginModal
  }

  return (
    <div className="login-container">
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
            />
            <TextInput
              label="Password"
              val={password}
              handleChange={setPassword}
              id="password-login"
              name="password"
              placeholder="********"
            />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Login;