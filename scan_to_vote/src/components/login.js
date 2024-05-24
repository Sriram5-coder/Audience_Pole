// login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import '../components/login.css';


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
    axios.post("http://localhost:3001/login",{username,password})
    .then(result=>{
      console.log(result)
      if(result.data==="success"){
          navigate('/admin')
      }

    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
      <h2 className="form-title" style={{ color: 'white'}}>Login</h2>
      <div className="form-group">
        <label className='label'>
          Username
        </label>
        <input
          type="text"
          className='input'
          name="username"
          placeholder='Enter username'
          value={username}
          onChange={handleUsernameChange}
        />
        </div>
        <div className="form-group">
        <label className='label'>
          Password
        </label>
        <input
          type="password"
          className='input'
          name="password"
          placeholder='Enter your Password'
          value={password}
          onChange={handlePasswordChange}
        />
        </div>
        <button className='submit-button' type='submit'>Login</button><br/>
        <Link to='/' style={{color:'white', textDecoration:'none'}}>
          Home
        </Link>
      </form>
    </div>
  );
}

export default Register;