import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/404';
import DashboardLayout from './components/Layout/Dashboard';
import Signup from './pages/Signup';
import Report from './pages/Report';
import ShoppingCart from './pages/ShoppingCart';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/dashboard" element={<DashboardLayout children={<Dashboard />} />} />
            <Route path="/shopping-cart" element={<DashboardLayout children={<ShoppingCart />} />} />
            <Route path="/report" element={<DashboardLayout children={<Report />} />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Router>
      </Provider>
      <Toaster />
    </React.StrictMode>
  </React.StrictMode>
)
