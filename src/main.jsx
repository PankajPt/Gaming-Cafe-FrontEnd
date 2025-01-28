import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import { User } from "./components/index.js"
import {
  Contact,
  Home,
  Events,
  GameCatelogue,
  LoginPage,
  Pricing,
  RegisterPage, UserPage, } from './pages/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='events' element={<Events />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route path='game-catalogue' element={<GameCatelogue />}/>
      <Route path='pricing' element={<Pricing />}/>
      <Route path='login' element={<LoginPage />}/>
      <Route path='register' element={<RegisterPage />}/>
      <Route path='user' element={<UserPage />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)