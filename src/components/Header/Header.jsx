import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth.Context.jsx';
import { GiHamburgerMenu, GiDiamondTrophy } from 'react-icons/gi';
import { RiCloseFill, RiCustomerService2Fill } from 'react-icons/ri';
import { FaGamepad, FaCrown } from 'react-icons/fa';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { logo } from '../../assets/index.assets.js';
import ThemeToggle from '../../components/ThemeToggle';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Header() {
  const { userRole, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  // const [isDarkMode, setIsDarkMode] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.add('dark'); // Force dark mode
  }, []);
  

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme');
  //   const isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    
  //   document.documentElement.classList.toggle('dark', isDark);
  //   setIsDarkMode(isDark);
  // }, [isDarkMode]);
  

  // Close menu on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleProfileClick = () => {
    userRole === 'admin' ? navigate('/admin') : navigate('/user');
    closeMenu();
  };

  return (
    <header className="sticky z-[60] top-0 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 border-b-2 border-gray-300 dark:border-blue-500/30 shadow-2xl">
      {/* Animated Top Border */}
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse blur-sm" />
      
      <nav className="px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center group transition-all duration-300 hover:text-green-400 dark:hover:text-green-300"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-16 neon-glow">
                <img 
                  src={logo} 
                  alt="MadGear Logo" 
                  className="h-full w-full object-contain filter brightness-125 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-lime-400/10 mix-blend-overlay" />
              </div>
              <div className="flex flex-col relative">
                <div className="font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400 dark:from-green-300 dark:to-lime-300 text-3xl tracking-wider">
                  MADGEAR
                </div>
                <span className="font-mono text-xs text-gray-600 dark:text-lime-300/80 tracking-widest mt-[-4px] ml-[2px]">
                  GAMING CAFE
                </span>
              </div>
            </div>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 ml-1 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400 z-50"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <RiCloseFill className="w-6 h-6 text-blue-400 animate-spin-in" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6 text-blue-400 animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
              onClick={closeMenu}
            />
          )}

          {/* Navigation Menu */}
          <div className={`
            fixed lg:relative inset-y-0 right-0 lg:right-auto
            w-3/4 lg:w-auto lg:bg-transparent
            bg-gray-900/95 backdrop-blur-lg lg:backdrop-blur-0
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
            lg:translate-x-0
            z-40 lg:z-auto
            pt-20 lg:pt-0
            h-screen lg:h-auto
          `}>
            <ul className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:space-x-6 font-orbitron h-full px-8 lg:px-0">
              {[
                { path: '/', name: 'Home', icon: <FaGamepad className="mr-2" /> },
                { path: '/game-catalogue', name: 'Games', icon: <FaCrown className="mr-2" /> },
                { path: '/events', name: 'Events', icon: <MdOutlineEventAvailable className='mr-2' /> },
                { path: '/contact', name: 'Contact', icon: <RiCustomerService2Fill className='mr-2' />},
                { path: '/pricing', name: 'Premium', icon: <GiDiamondTrophy className='mr-2' /> },
              ].map((item) => (
                <li key={item.path} className="w-full lg:w-auto">
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `relative flex items-center px-4 py-3 lg:py-2 text-gray-600 dark:text-gray-300 hover:text-green-400 
                      dark:hover:text-green-300 transition-all duration-300 text-xl lg:text-base
                      ${isActive ? 'text-blue-400 dark:text-blue-300' : ''}
                      border-b border-gray-200 dark:border-gray-700 lg:border-0
                      before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] 
                      before:bg-gradient-to-r before:from-green-400 before:to-lime-400 before:transition-all before:duration-300 
                      hover:before:w-full group`
                    }
                  >
                    {item.icon}
                    <span className="tracking-wide">{item.name}</span>
                  </NavLink>
                </li>
              ))}

              {/* Dark Mode Switch */}
              {/* <li className="w-full lg:w-auto">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="relative flex items-center px-4 py-3 lg:py-2 text-gray-600 dark:text-gray-300 hover:text-green-400 
                    dark:hover:text-green-300 transition-all duration-300 text-xl lg:text-base
                    border-b border-gray-200 dark:border-gray-700 lg:border-0
                    before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] 
                    before:bg-gradient-to-r before:from-green-400 before:to-lime-400 before:transition-all before:duration-300 
                    hover:before:w-full group"
                >
                  {isDarkMode ? (
                    <FiSun className="mr-2 text-yellow-400" />
                  ) : (
                    <FiMoon className="mr-2 text-blue-400" />
                  )}
                  <span className="tracking-wide">
                    {isDarkMode ? 'Light' : 'Dark'}
                  </span>
                </button>
              </li> */}

              {/* Auth Buttons */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:ml-6 mt-8 lg:mt-0 w-full lg:w-auto">
                {!userRole ? (
                  <>
                    <li className="w-full lg:w-auto">
                      <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className="w-full lg:w-auto px-6 py-3 lg:py-2 text-center text-blue-400 dark:text-blue-300 border-2 border-blue-400/50 dark:border-blue-300/50 rounded-xl hover:bg-blue-400/10 dark:hover:bg-blue-300/10 hover:border-blue-400 dark:hover:border-blue-300 hover:shadow-blue-glow transition-all duration-300 block"
                      >
                        Log in
                      </NavLink>
                    </li>
                    <li className="w-full lg:w-auto">
                      <NavLink
                        to="/register"
                        onClick={closeMenu}
                        className="w-full lg:w-auto px-6 py-3 lg:py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-purple-glow transform hover:scale-105 transition-all duration-300 shadow-lg block text-center"
                      >
                        Join the Arena
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="flex flex-col lg:flex-row items-center gap-6 w-full lg:w-auto">
                    <button
                      onClick={handleProfileClick}
                      className="w-full lg:w-auto flex items-center justify-center px-6 py-3 lg:py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white rounded-xl hover:shadow-blue-glow transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-xl mr-2">👾</span>
                      <span className="font-semibold">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="w-full lg:w-auto px-6 py-3 lg:py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-red-glow transform hover:scale-105 transition-all duration-300 text-center"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}