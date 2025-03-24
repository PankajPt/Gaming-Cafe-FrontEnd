import React from 'react'
import { Header, Footer } from "./components/index.js"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet />
    <Footer />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className="fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg z-[9999]"
      toastClassName="bg-gray-900 border border-red-500 rounded-lg p-4 text-sm shadow-2xl backdrop-blur-lg"
      bodyClassName="text-sm sm:text-base font-semibold p-3 text-red-200"
      progressClassName="bg-red-600 h-1"
    />
    </>
  )
}

export default Layout