import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Dashboard/Footer';
import Header from './HomePage/Header';
import { Link ,useParams ,useNavigate} from 'react-router-dom';

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
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Upload Resume</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
   

            <div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                          
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3"></h4>
                                <p className="mb-3"><h6 style={{ color: 'black' }}>Please upload your resume to proceed with your application</h6></p>
                                <input type="file" id="fileInput" onChange={handleFileChange} accept=".pdf" style={{ display: 'none' }} />
                                  <label htmlFor="fileInput" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                                      <i className="me-2 text-primary"></i>
                                     Choose file
                                  </label>
                                  <button className="btn border border-danger rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginLeft: '200px' }}  onClick={handleUpload} >Upload</button>
                                   </div>





{/* 
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
 */}




                           {result && !result.error && (

                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                            aria-controls="nav-about" aria-selected="true">Resume Result</button>
                                    </div>
                                </nav>
                                <div className="tab-content mb-5">
                                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                   
                                       
                                        <div className="px-2">
                                            <div className="row g-4">
                                                <div className="col-6">
                                                <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Email </p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Email Addresses']} </p>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Phone Number</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Phone Numbers']} </p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Skills</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Skills']}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Languages </p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Languages']}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-12">
                                                        <p style={{ color: 'green' }}>Data Saved in  Database Successfully!</p>
                                                        </div>
                                                        
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div> )}
                            {result && result.error && (
        <div>
          <p style={{ color: 'red' }}>Error: {result.error}</p>
        </div>
      )}
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="input-group w-100 mx-auto d-flex mb-4">
                                    
                                </div>
                                <div className="mb-4">
                                    <h4>Resume </h4>
                                    <p>Your resume is a critical component of the job application process. It serves as your personal marketing tool, showcasing your skills, qualifications, and experiences to potential employers. The importance of a well-crafted resume cannot be overstated, as it is often the first impression that hiring managers have of you.</p>
                                    <div className="d-flex justify-content-center my-4">
                                             <Link to="dash"  className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"> 
                                               More offers
                                             </Link>  
                                          
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    
                </div>
            </div>
            
        </div>

        
        <Footer />
  
        </>
  );
}

export default Cv;
