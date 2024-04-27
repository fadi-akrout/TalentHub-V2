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
          //  navigate("/login")
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
         

          <section className="contact-us" id="contact">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="row">
                    <div className="col-lg-12">
                    <form id="contact" >
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Email Verification</h2>
                      </div>
           
            
            <label htmlFor="otp" >Enter OTP:</label>
            <div className="col-lg-4">
            <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            /> </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="col-lg-4"> <button onClick={handleVerify}>Verify</button>
            </div>
          </div>
            </form>
            </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="upcoming-meetings" id="meetings">
            <Footer />
          </section>
        </>
    );
};

export default VerifyEmail;
