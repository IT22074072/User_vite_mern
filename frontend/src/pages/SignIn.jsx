import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user); //userSlice name

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(false); ///////


  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      // Sending a POST request to the server for sign-in
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Parsing the response JSON


      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      // Check if the user is an admin based on userType
      if (data.userType === 'admin') {
        setAdmin(true);                ///////
      }

      dispatch(signInSuccess(data));
      navigate('/'); // Navigating to the home page on successful sign-in
    } catch (error) {
      // Handling errors during the fetch or JSON parsing
      console.error('Error during sign-in:', error);
      const errorData = {
        message: error.message, // or any other relevant error information
      };
      dispatch(signInFailure(errorData));
    }
  };

  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>

        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Do not have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <Link to="/forgotPassword" style={{ textDecoration: 'underline' }}>
          <span className='text-blue-500'>Forgot Password?</span>
        </Link>
      </div>

      <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
    </div>
  );
}
