import { useEffect, useRef, useState, } from 'react'
import BG from '../../assets/images/nav-bg.png'
import logo from '../../assets/images/logo.png'
import activeHome from '../../assets/images/white-home-icon.svg'
import home from '../../assets/images/blued-home-icon.svg'
import user_ from '../../assets/images/user.svg'
import activeUser from '../../assets/images/active-user.svg'
import department from '../../assets/images/cluster.svg'
import activeDepartment from '../../assets/images/active-cluster.svg'
import '../../assets/scss/dashboardLayout.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Modal from '../Modal';
import toast from 'react-hot-toast';
import AppServices, { getAuthToken } from "../../services";


const DashboardLayout = ({ children }) => {

  const childRef = useRef(null);

  const toggleModal = () => {
    if (childRef.current)
      childRef.current.toggleModal();
  }

  const [menuStatus, setMenuStatus] = useState(false);
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState({});
  // const [isLoggedIn] = useState(getAuthToken !== null)
  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
  }
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate('/login');
  }

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   }
  // }, [isLoggedIn])



  useEffect(() => {
    if (sidebarStatus) {
      toggleSidebar();
    }
  }, [useLocation().pathname])


  return (
    <>
      <div className='nav-bar bg-primary'>
      </div>
      <div className="flex">
        <div className='full-height w-full bg-customBg'>{children}</div>
      </div>
    </>
  )
}

export default DashboardLayout
