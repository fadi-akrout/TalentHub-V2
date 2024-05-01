import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../ClientComponent/Dashboard/Footer';
import HeaderClient from '../../ClientComponent/Dashboard/HeaderClient';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { userId } = useParams();
  console.log(userId);

  const navigate = useNavigate()

  const handleVerify = async () => {
    try {
      const response = await axios.post(`http://localhost:3500/auth/verify-email/${userId}`, {
        otp: otp
      });
      console.log(response.data);
        navigate("/login")
      // Handle success, show message or redirect
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while verifying email.');
      }
    }
  };

  return (
    <>
      <div> <HeaderClient /> </div>

      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Email Verification</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <form id="contact" >
          <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
            <div className="row">
              <label className="form-label my-3" >Enter OTP:</label>
              <div className="col-lg-4">
                <input
                 className= "form-control"
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                /> </div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <div className="col-lg-4">
                </div>
                </div>
                <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginTop: '20px' }} onClick={handleVerify}>Verify</button>
              </div>
            </div>
          </form>
       
         
        
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyEmail;
