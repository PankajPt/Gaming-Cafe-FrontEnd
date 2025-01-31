import React from 'react'
import ReactDOM from 'react-dom/client'
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
  RegisterPage, UserPage, AdminDashboard} from './pages/index.js'
import ProtectedRoute from './routes/Protected.routes.jsx'
import { AuthProvider } from './context/Auth.Context.jsx'

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

      {/* Protected routes */}
      <Route path='user' element={<ProtectedRoute><UserPage /></ProtectedRoute>}/>
      <Route path='admin' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)