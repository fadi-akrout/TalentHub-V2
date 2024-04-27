import '../public/css/style.css'
import '../public/scss/bootstrap.css'


import Home from './Home/Home'
import Header from './Home/Header'
import Footer from './Home/Footer'
import HomeP from './Home/HomeP'

import React, { useState, Suspense, lazy } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Apply from './Offer/Apply'
import Layout from './components/Layout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   {/*  <Header/>
    <Home />
    <Footer/> */}
         <Routes>
           <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Home />} />

            <Route path="HomeP">
                      <Route index element={<HomeP />} />
            </Route>
            
            <Route path="apply/:id">
                      <Route index element={<Apply />} />
            </Route>
         </Route>
        </Routes>
    </>
  )
}

export default App
