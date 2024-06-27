import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import 'boxicons'

function Signin() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!form.username) {
      errors.username = 'Username is required.';
    }
    if (!form.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(' ', form);
        setMessage(response.data.message);
        setErrors({});
        alert('Login successful!');
      } catch (error) {
        setErrors({error: error.response.data.error});
        setMessage('');
        alert(error.response.data.error);
      }
    } else {
      setErrors(errors);
      setMessage('');
      Object.values(errors).forEach(error => alert(error));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('', form);
      setMessage(response.data.message);
      setErrors('');
    } catch (error) {
      setErrors(error.response.data.error);
      setMessage('');
    }
  };

  const handleLoginWithFacebook = (response) => {
     console.log(response)
  };

  const handleLoginWithGoogle = (response) => {
     console.log(response)
  };

  return (
    <div className='form-container' id='signin'>
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='form-cont'>
        <div>
          <input type="text" 
          name="username" 
          value={form.username} 
          onChange={handleChange} 
          placeholder='Username or Email'
          required
          /> <br />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <input type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
          placeholder='Password'
          required
          /> <br />
          {errors.password && <span className="error">{errors.password}</span>}
          <span onClick={handleForgotPassword}>Forgot Password ?</span>
        </div>
        <div>
          <button type="submit" className='submit'>Login</button>
        </div>
      <p>Don't have an Acoount ? Register now <Link to="/signup"> Sign Up</Link></p>
      <div>
        <button onClick={handleLoginWithFacebook} className='buttonf'>
          <box-icon  type='logo' name='facebook' ></box-icon>Login with Facebook</button>
        <button onClick={handleLoginWithGoogle} className='buttong'>
          <box-icon type='logo' name='google'></box-icon>Login with Google</button>
      </div>
      </form>
      {errors.error && <p className="error">{errors.error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
    </div>
  );
}

export default Signin;
