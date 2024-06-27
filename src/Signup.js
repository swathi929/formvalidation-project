import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';


function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
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
    if (form.username.length < 4 || form.username.length > 25) {
      errors.username = 'Username must be between 4 and 25 characters.';
    }
    if (!form.email.includes('@')) {
      errors.email = 'Invalid email address.';
    }
    if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (form.password !== form.confirm) {
      errors.confirm = 'Passwords must match.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('', form);
        setMessage(response.message);
        setErrors({});
        alert('Registration successful!');
      } catch (error) {
        setErrors(error.response);
        setMessage('');
        Object.values(error.response).forEach(err => alert(err));
      }
    } else {
      setErrors(errors);
      setMessage('');
      Object.values(errors).forEach(error => alert(error));
    }
  };

  const handleLoginWithFacebook = (response) => {
    console.log(response)
 };

 const handleLoginWithGoogle = (response) => {
    console.log(response)
 };

  return (
    <div className="form-container" id='signup'>
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className='form-cont'>
        <div>
          <input type="text" 
          name="username" 
          value={form.username} 
          onChange={handleChange} 
          placeholder='Username'
          /> <br/>
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <input type="text"
           name="email"
            value={form.email} 
            onChange={handleChange} 
            placeholder='Email'
            /> <br/>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <input type="password" 
          name="password" 
          value={form.password} 
          onChange={handleChange}
          placeholder='Password'
          /> <br/>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <input type="password"
           name="confirm"
           value={form.confirm}
           onChange={handleChange} 
            placeholder='Confirm Password' 
          /> <br/>
          {errors.confirm && <span className="error">{errors.confirm}</span>}
        </div>
        <div>
          <button type="submit" className='submit'>Signup</button>
        </div>
        <p>Already have an Account ? Please <Link to="/signin"> Login</Link></p>
        <div>
        <button onClick={handleLoginWithFacebook} className='buttonf'><box-icon type='logo' name='facebook'></box-icon>Login with Facebook</button>
        <button onClick={handleLoginWithGoogle} className='buttong'><box-icon type='logo' name='google'></box-icon>Login with Google</button>
      </div>
      </form>
      {message && <p className="success">{message}</p>}
    </div>
    </div>
  );
}

export default Signup;
