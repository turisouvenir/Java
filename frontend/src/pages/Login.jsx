import { useEffect, useState, useRef } from 'react'

import logo from '../assets/images/logo.png'
import '../assets/scss/login.scss'
import toast from 'react-hot-toast';
import AppServices from "../services";

import { NavLink, useNavigate } from 'react-router-dom';


function Login() {
  const [username, SetUsername] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [password, SetPassword] = useState('')
  const [admin, setAdmin] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth_token') !== null )

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn])

  const onChangeUsername = (e) => {
    SetUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    SetPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (submitted) return;
    setSubmitted(true);

    toast.promise(
      AppServices.login({ username, password }),
      {
        loading: 'Logging in ...',
        success: (response) => {
          if (response.data.token) {
            localStorage.setItem("auth_token", JSON.stringify(`Bearer ${response.data.token}`));
          }
          navigate('/');
          setSubmitted(false);
          return "Logged in successfully";
        },
        error: (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSubmitted(false);
          return message;
        },
      }
    );
  }
  

  return (
    <div className="bg-primary h-screen flex justify-center">
      <div className="form bg-main flex max-w-md w-screen h-max justify-center p-8 m-auto">
        <form className='text-center' onSubmit={handleLogin}>
          <img src={logo} className="mb-9 mx-auto h-[23vh]" alt="logo" />
          <div className="title mb-8">Welcome to EDS <br />
            <div className="small">Equipment Distribution System</div></div>
          <div className="input-container  mb-8">
            <input onChange={onChangeUsername} className='bg' placeholder="username" type="text" name="" id="" />
          </div>

          <div className="input-container  mb-8">
            <input onChange={onChangePassword} className='bg' placeholder='password' type="password" name="" id="" />
          </div>
          <div className="input-container  mb-8">
            <input className='submit bg-primary text-main cursor-pointer rounded-md' type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

