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
import AddOffer from './ClientComponent/OfferComponent/AddOffer'
import PersistLogin from './features/auth/PersistLogin';
import Prefetch from './features/auth/Prefetch';
import RequireAuth from './features/auth/RequireAuth'

import DashLayout from './components/DashLayout';

import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import AccountStats from './ClientComponent/AdminStatistique/AcountStats';
import StudentProfile from './ClientComponent/StudentComponent/StudentProfile';
import Profile from './features/auth/profile';


const Login = lazy(() => import('./features/auth/Login'));
const Signup = lazy(() => import('./features/auth/Signup'));
const ResetPassword = lazy(() => import('./features/auth/resetPassword'));
const VerifyEmail = lazy(() => import('./features/auth/verifyEmail'));
import ForgotPassword from './features/auth/forgotPassword';
import Evenements from './ClientComponent/EventComponent/Event'
import AddEvent from './ClientComponent/EventComponent/AddEvent'
import AddStudent from './ClientComponent/StudentComponent/AddStudent';
import Question from './ClientComponent/OfferComponent/Question';

import { ROLES } from './config/roles'
import UpdateOffer from './ClientComponent/OfferComponent/UpdateOffer'
const Myoffers = lazy(() => import('./ClientComponent/OfferComponent/ownedOfferList'));
const Ownedoffers = lazy(() => import('./ClientComponent/OfferComponent/OwnedOfferListRecruiter'));
const OwnedofferUserList = lazy(() => import('./ClientComponent/OfferComponent/OfferUserList'));
import AddStaff from './ClientComponent/StaffComponent/AddStaff'
import Alumni from './ClientComponent/AlumniComponent/AddAlumni'
const Cv = lazy(() => import('./ClientComponent/cv'));
const Job = lazy(() => import('./ClientComponent/job'));

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
                      <Route path="stats">
                        <Route index element={<AccountStats />} />
                      </Route>

                    </Route>

                    <Route path="apply/:id">
                      <Route index element={<Apply />} />
                    </Route>
                    <Route path="addoffer">
                      <Route index element={<AddOffer />} />
                    </Route>
                    <Route path="updateoffer/:id">
                      <Route index element={<UpdateOffer />} />
                    </Route>
                    <Route path="myoffers/:id">
                      <Route index element={<Myoffers />} />
                    </Route>
                    <Route path="ownedoffers/:id">
                      <Route index element={<Ownedoffers />} />
                    </Route>
                    <Route path="ownedofferUserList/:id">
                      <Route index element={<OwnedofferUserList />} />
                    </Route>
                    <Route path="add-Student">
                      <Route index element={<AddStudent />} />
                    </Route>

                    <Route path="Alumnis">
                      <Route index element={<Alumni />} />
                    </Route>
                    <Route path="staff">
                      <Route index element={<AddStaff />} />
                    </Route>
                    <Route path="ProfileStudent/:id">
                      <Route index element={<StudentProfile />} />
                    </Route>
                    <Route path="Profile">
                      <Route index element={<Profile />} />
                    </Route>
                    <Route path="evenements">
                      <Route index element={<Evenements />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Recruter, ROLES.Teacher]} />}>
                      <Route path="add-event">
                        <Route index element={<AddEvent />} />
                      </Route>
                      <Route path="cv">
                        <Route index element={<Cv />} />
                      </Route>
                      <Route path="job">
                        <Route index element={<Job />} />
                      </Route>
                      <Route path="question">
                        <Route index element={<Question />} />
                      </Route>


                    </Route>  {/* End Dash */}
                  </Route>
                </Route>
              </Route>  {/* End Protected Routes */}


            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
