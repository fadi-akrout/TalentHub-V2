import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Dashboard/Footer';
import Header from './HomePage/Header';

function Job() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
  
      const response = await axios.post('http://localhost:5001/uploadJob', formData, {
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
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Upload Job</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
      <section className="contact-us" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 align-self-center">
          <div className="row">
            <div className="col-lg-12">
    
      
      <input  type="file" onChange={handleFileChange} accept=".pdf" />
      <button className="btn btn-danger" onClick={handleUpload}>Upload</button>
      {result && !result.error && (
        <div >
          <h2 style={{ color: 'white' }}>Resume Result</h2>
          <p style={{ color: 'white' }}>Experience Required: {result['Experience Required']}</p>
          <p style={{ color: 'white' }}>Domain: {result['Domain']}</p>
          <p style={{ color: 'white' }}>Speciality: {result['Speciality']}</p>
          <p style={{ color: 'white' }}>Job Type: {result['Job Type']}</p>
          <p style={{ color: 'green' }}>Data Ectracted from Job Description Successfully!</p>
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
            <br /><br /><br /><br />
            <section className="upcoming-meetings" id="meetings">
        <Footer />
      </section>
        </>
  );
}

export default Job;
