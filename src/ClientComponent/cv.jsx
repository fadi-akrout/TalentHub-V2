import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Dashboard/Footer';
import Header from './HomePage/Header';

function Cv() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
  
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div>
        <Header />
      </div>
      <section className="contact-us" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 align-self-center">
          <div className="row">
            <div className="col-lg-12"></div>
    <div>
      <h1 style={{ color: 'white' }}>Upload Resume</h1>
      <input style={{ color: 'white' }} type="file" onChange={handleFileChange} accept=".pdf" />
      <button className="btn btn-danger" onClick={handleUpload}>Upload</button>
      {result && !result.error && (
        <div >
          <h2 style={{ color: 'white' }}>Resume Result</h2>
          <p style={{ color: 'white' }}>Email: {result['Email Addresses']}</p>
          <p style={{ color: 'white' }}>Phone Number: {result['Phone Numbers']}</p>
          <p style={{ color: 'white' }}>Skills: {result['Skills']}</p>
          <p style={{ color: 'white' }}>Languages: {result['Languages']}</p>
          <p style={{ color: 'green' }}>Data Saved in  Database Successfully!</p>
        </div>
      )}
      {result && result.error && (
        <div>
          <p style={{ color: 'red' }}>Error: {result.error}</p>
        </div>
      )}
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
}

export default Cv;
