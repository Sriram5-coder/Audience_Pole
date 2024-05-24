// login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3001/register",{username,password})
    .then(result=>{console.log(result)
      navigate('/login')
    })
    .catch(err=>console.log(err))
  }

  return (
    <>
    <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder='Enter username'
          value={username}
          onChange={handleUsernameChange}
        />
        <label>
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder='Enter your Password'
          value={password}
          onChange={handlePasswordChange}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default Register;
