import React, { useState } from 'react';
import { TextInput } from '../Input';
import Button from '../Button'
import { serverAPI } from '../../utils/axios';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="field-container">

          <label htmlFor="email-login" className="input-label">Email</label>
          <TextInput
            val={email}
            handleChange={setEmail}
            id="email-login"
            name="email"
            placeholder="example@email.com"
          />
        </div>
        <div className="field-container">
          <label htmlFor="password-login">Password</label>
          <TextInput
            val={password}
            handleChange={setPassword}
            id="password-login"
            name="password"
            placeholder="********"
          />

        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}

export default Login;