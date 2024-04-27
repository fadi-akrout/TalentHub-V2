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
  <section className="contact-us" id="contact">
<div className="container">
  <div className="row">
    <div className="col-lg-12 align-self-center">
      <div className="row">
        <div className="col-lg-12"></div>
    <div>
      <h2>Forgot Password</h2>
      {message && <p style={{ color: 'white' }}>{message}</p>}
      {error && <p style={{ color: 'white' }} >{error}</p>}
      <form id="contact" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
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

export default ForgotPassword;