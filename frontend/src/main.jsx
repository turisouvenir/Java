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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardLayout children={<Dashboard />} />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
      <Toaster />
    </React.StrictMode>
  </React.StrictMode>
)
