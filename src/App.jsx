import '../public/css/style.css'
import '../public/scss/bootstrap.css'


import Home from './ClientComponent/HomePage/Home'
import Header from './ClientComponent/HomePage/Header'
import Footer from './ClientComponent/Dashboard/Footer'
import HomeP from './ClientComponent/HomePage/HomeP'

import React, { useState, Suspense, lazy } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Apply from './ClientComponent/OfferComponent/ApplyOffer'
import Layout from './components/Layout'
import PersistLogin from './features/auth/PersistLogin';
import Prefetch from './features/auth/Prefetch';
import RequireAuth from './features/auth/RequireAuth'

import DashLayout from './components/DashLayout';

import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';


const Login = lazy(() => import('./features/auth/Login'));
const Signup = lazy(() => import('./features/auth/Signup'));
const ResetPassword = lazy(() => import('./features/auth/resetPassword'));
const VerifyEmail = lazy(() => import('./features/auth/verifyEmail'));
import ForgotPassword from './features/auth/forgotPassword';


import { ROLES } from './config/roles'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   {/*  <Header/>
    <Home />
    <Footer/> */}
    <Suspense fallback={<div>Loading...</div>}>
         <Routes>
           <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password">
              <Route index element={<ResetPassword />} />
            </Route>
            <Route path="/verify-email/:userId" element={<VerifyEmail />} />


          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                <Route element={<Prefetch />}>
                  <Route path='dash' element={<DashLayout />}>
                    <Route path="*" element={<Navigate to="/dash" />} />
                    <Route index element={<HomeP />} />

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path="users">
                        <Route index element={<UsersList />} />
                        <Route path=":id" element={<EditUser />} />
                        <Route path="new" element={<NewUserForm />} />
                      </Route>

                    </Route>
            
            <Route path="apply/:id">
                      <Route index element={<Apply />} />
            </Route>


            </Route>  {/* End Dash */}
                </Route>
              </Route>
         </Route>  {/* End Protected Routes */}
         </Route>
        </Routes>
        </Suspense>
    </>
  )
}

export default App
