import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../../ClientComponent/Dashboard/Footer';
import Header from '../../ClientComponent/HomePage/Header';
import HeaderClient from '../../ClientComponent/Dashboard/HeaderClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3500/auth/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.message);
      setMessage('');
    }
  };

  return (
    <>
    <div>
    <HeaderClient />
  </div>
  <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Forget Password</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item" />
                    <li className="breadcrumb-item" />
                    <li className="breadcrumb-item active text-white"></li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5">

  
     
        
    <div>
    
      {message && <p >{message}</p>}
      {error && <p  >{error}</p>}
      <form id="contact" onSubmit={handleSubmit}>
      <div className="row g-5">
      <div className="col-md-12 col-lg-6 col-xl-7">
        <div>
          <label className="form-label my-3">Email:</label>
          <input
          className='form-control'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        </div>
        </div>
        <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginTop: '20px' }} type="submit">Submit</button>
      </form>
    </div>
    
           
            </div>
            </div>
            </>
  );
};

export default ForgotPassword;