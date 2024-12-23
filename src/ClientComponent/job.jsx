import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Dashboard/Footer';
import Header from './HomePage/Header';
import { Link ,useParams ,useNavigate} from 'react-router-dom';

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
        <h1 className="text-center text-white display-6">Upload Job description</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>
     
    
         {/*    <h6 style={{ color: 'black' }}>please upload your job offer to extract data</h6>
      <input  type="file" onChange={handleFileChange} accept=".pdf" />
      <button className="btn btn-danger" onClick={handleUpload}>Upload</button>
      {result && !result.error && (
        <div >
          <h2>Resume Result</h2>
          <p>Experience Required: {result['Experience Required']}</p>
          <p>Domain: {result['Domain']}</p>
          <p>Speciality: {result['Speciality']}</p>
          <p>Job Type: {result['Job Type']}</p>
          <p style={{ color: 'green' }}>Data Ectracted from Job Description Successfully!</p>
        </div>
      )}
      {result && result.error && (
        <div>
          <p style={{ color: 'red' }}>Error: {result.error}</p>
        </div>
      )} */}
    
            <div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                          
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3"></h4>
                                <p className="mb-3"><h6 style={{ color: 'black' }}>Please upload your job offer to extract data</h6></p>
                                <input type="file" id="fileInput" onChange={handleFileChange} accept=".pdf" style={{ display: 'none' }} />
                                  <label htmlFor="fileInput" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                                      <i className="me-2 text-primary"></i>
                                     Choose file
                                  </label>
                                  <button className="btn border border-danger rounded-pill px-4 py-2 mb-4 text-primary" style={{ marginLeft: '200px' }}  onClick={handleUpload} >Upload</button>
                                   </div>

                           {result && !result.error && (

                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                            aria-controls="nav-about" aria-selected="true">Job Result</button>
                                    </div>
                                </nav>
                                <div className="tab-content mb-5">
                                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                   
                                       
                                        <div className="px-2">
                                            <div className="row g-4">
                                                <div className="col-6">
                                                <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Experience Required </p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Experience Required']}  </p>
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Domain:</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0"> {result['Domain']} </p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Speciality </p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Speciality']}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Job Type</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{result['Job Type']}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-12">
                                                        <p style={{ color: 'green' }}>Data Ectracted from Job Description Successfully!</p>
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
                                    <h4>Job offer </h4>
                                    <p>Recruiters play a crucial role in the hiring process, from sourcing candidates and conducting interviews to assessing qualifications and facilitating the selection process. Your expertise in evaluating resumes, conducting screenings, and assessing candidates' skills and cultural fit is essential in identifying the best candidates for a given position.</p>
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

export default Job;
