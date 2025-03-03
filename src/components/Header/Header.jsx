import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth.Context.jsx';
import { GiHamburgerMenu, GiDiamondTrophy } from 'react-icons/gi';
import { RiCloseFill, RiCustomerService2Fill } from 'react-icons/ri';
import { FaGamepad, FaCrown } from 'react-icons/fa';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { logo } from '../../assets/index.assets.js';

export default function Header() {
  const { userRole, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const handleProfileClick = () => {
    userRole === 'admin' ? navigate('/admin') : navigate('/user');
  };

  return (
    <header className="sticky z-50 top-0 bg-gradient-to-b from-gray-900 to-gray-800 border-b-2 border-blue-500/30 shadow-2xl">
      {/* Original Blue/Purple Animated Top Border */}
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse blur-sm" />
      <nav className="px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Green Logo Section */}
          <Link 
            to="/" 
            className="flex items-center group transition-all duration-300 hover:text-green-400"
          >
            <div className="flex items-center gap-3">
              {/* PNG Logo with Neon Green Effect */}
              <div className="relative h-16 w-16 neon-glow">
                <img 
                  src={logo} 
                  alt="MadGear Logo" 
                  className="h-full w-full object-contain filter brightness-125 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-lime-400/10 mix-blend-overlay" />
              </div>

              {/* Text Logo with Green Gradient */}
              <div className="flex flex-col relative">
                <div className="font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400 text-3xl tracking-wider">
                  MADGEAR
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="font-mono text-xs text-lime-300/80 tracking-widest mt-[-4px] ml-[2px]">
                  GAMING CAFE
                </span>
                {/* Neon Green Underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-lime-400 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 ml-1 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <RiCloseFill className="w-6 h-6 text-blue-400" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6 text-blue-400" />
            )}
          </button>

          {/* Navigation Menu */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } lg:flex lg:items-center lg:order-2 w-full lg:w-auto mt-4 lg:mt-0 bg-gray-900/90 lg:bg-transparent rounded-xl lg:rounded-none backdrop-blur-sm lg:backdrop-blur-0 transition-all duration-300`}
          >
            <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 font-orbitron">
              {[
                { path: '/', name: 'Home', icon: <FaGamepad className="mr-2" /> },
                { path: '/game-catalogue', name: 'Game Catalogue', icon: <FaCrown className="mr-2" /> },
                { path: '/events', name: 'Events', icon: <MdOutlineEventAvailable className='mr-2' /> },
                { path: '/contact', name: 'Contact', icon: <RiCustomerService2Fill className='mr-2' />},
                { path: '/pricing', name: 'Premium', icon: <GiDiamondTrophy className='mr-2' /> },
              ].map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `relative flex items-center px-4 py-2 text-gray-300 hover:text-green-400 transition-all duration-300
                      ${isActive ? 'text-blue-400' : ''}
                      before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] 
                      before:bg-gradient-to-r before:from-green-400 before:to-lime-400 before:transition-all before:duration-300 
                      hover:before:w-full group`
                    }
                  >
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    <span className="tracking-wide">{item.name}</span>
                  </NavLink>
                </li>
              ))}

              {/* Auth Buttons */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:ml-6 mt-4 lg:mt-0">
                {!userRole ? (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className="px-6 py-2 text-blue-400 border-2 border-blue-400/50 rounded-xl hover:bg-blue-400/10 hover:border-blue-400 hover:shadow-blue-glow transition-all duration-300"
                      >
                        Log in
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        onClick={closeMenu}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-purple-glow transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Join the Arena
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="flex items-center gap-4">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white rounded-xl hover:shadow-blue-glow transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-xl mr-2">👾</span>
                      <span className="font-semibold">Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-red-glow transform hover:scale-105 transition-all duration-300"
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