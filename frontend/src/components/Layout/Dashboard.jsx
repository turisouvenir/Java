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
import AppServices from "../../services";


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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth_token') !== null)
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

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn])



  useEffect(() => {
    if (sidebarStatus) {
      toggleSidebar();
    }
  }, [useLocation().pathname])


  return (
    <>
      <div className='nav-bar bg-primary'>
        <div className="flex justify-end ml-auto place-items-center">
          <div
            onClick={toggleSidebar}
            className="toggle-sidebar lg:hidden cursor-pointer flex place-items-center justify-center"
          >
            {sidebarStatus ? <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 18V20H3V18H21ZM6.596 3.90399L8.01 5.31799L4.828 8.49999L8.01 11.682L6.596 13.096L2 8.49999L6.596 3.90399ZM21 11V13H12V11H21ZM21 3.99999V5.99999H12V3.99999H21Z"
                fill="#28A4E2"
              />
            </svg> : <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 18V20H3V18H21ZM17.404 3.90399L22 8.49999L17.404 13.096L15.99 11.682L19.172 8.49999L15.99 5.31799L17.404 3.90399ZM12 11V13H3V11H12ZM12 3.99999V5.99999H3V3.99999H12Z"
                fill="#28A4E2"
              />
            </svg>}

          </div>
        </div>
      </div>
      <div className="flex">
        <div className={`full-height sidebar ${sidebarStatus ? 'absolute' : 'hidden'} md:block`}>
          <div id="logo" className="flex justify-center">
            <img
              alt="Logo"
              src={logo}
            />
          </div>
          <ul className="list-reset text-left flex flex-col h-4/6">
            <li
              className="dropdown"
              id="dropdown"
            >
              <NavLink
                className={`link-item colored-link ${useLocation().pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                <img
                  src={useLocation().pathname === '/' ? activeHome : home}
                  alt=""
                />
                <span className="menu-link">
                  Home
                </span>
              </NavLink>
            </li>
          </ul>
          <div
            className="flex relative"
          >
            <button className='absolute bg-primary w-full rounded h-[40px] text-main' onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className=' full-height w-full bg-customBg'>{children}</div>
      </div>
    </>
  )
}

export default DashboardLayout
