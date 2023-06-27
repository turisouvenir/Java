import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Table from '../components/Table'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, config } from '../services';

function Report() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token")
  const [role, setRole] = useState("")

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, config);
      setRole(response?.data.data.role);
      if (response.data.data.role !== "ADMIN") {
        navigate('/dashboard');

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    //redirect to login form when no token found
    if (!token) {
      navigate('/login');
    }
  }, [token])
  return (
    <div>
      <Navbar />
      <div className='mt-12 w-[90%] mx-auto'>
        <Table />
      </div>
    </div>
  )
}

export default Report