import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import {
  Contact, Home, Events,
  GameCatelogue, LoginPage, Pricing,
  RegisterPage, UserPage, AdminDashboard, 
  ForgotPasswordPage, SubmitPasswordForm } from './pages/index.js'
import ProtectedRoute from './routes/Protected.routes.jsx'
import { AuthProvider } from './context/Auth.Context.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.add(savedTheme);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='events' element={<Events />} />
      <Route path='contact' element={<Contact />} />
      <Route path='game-catalogue' element={<GameCatelogue />}/>
      <Route path='pricing' element={<Pricing />}/>
      <Route path='login' element={<LoginPage />}/>
      <Route path='register' element={<RegisterPage />}/>
      <Route path='forgot-password' element={<ForgotPasswordPage />}/>
      <Route path='submit-password' element={<SubmitPasswordForm />}/>
      {/* Protected routes */}
      <Route path='user' element={<ProtectedRoute><UserPage /></ProtectedRoute>}/>
      <Route path='manager' element={<ProtectedRoute><UserPage /></ProtectedRoute>}/>
      <Route path='admin' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Route>
  )
)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)