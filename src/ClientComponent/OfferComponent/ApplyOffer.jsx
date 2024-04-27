import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useParams ,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth'
import Header from '../HomePage/Header.jsx'
function ApplyOffer() {
    const navigate = useNavigate();
    const{id}=useParams()
    const [Title,SetTitle]=useState()
    const [Experience_required,SetExperience_required]=useState()
    const [Domain,SetDomain]=useState()
    const [Mission,SetMission]=useState()
    const [Salary,SetSalary]=useState()
    const [Speciality,SetSpeciality]=useState()
    const [JobType,SetJobType]=useState()
    const [JobCity,SetJobCity]=useState()
    const { userId } = useAuth()
   
   
   
           useEffect(() => {
               axios.get('http://localhost:3500/offers/getoffer/'+id)
                   .then(response => { console.log(response)
                      // setOffers(response.data);
                      SetTitle(response.data.Title);
                      SetExperience_required(response.data.Experience_required);
                      SetDomain(response.data.Domain);
                      SetMission(response.data.Mission);
                      SetSalary(response.data.Salary);
                      SetSpeciality(response.data.Speciality);
                      SetJobType(response.data.JobType);
                      SetJobCity(response.data.JobCity);
   
   
                   })
                   .catch(error => {
                       console.error("Il y a eu une erreur !", error);
                   });
           }, []);
   
   
   
   
           const Update = (e) => {
             e.preventDefault();
             
             axios.post('http://localhost:3500/offers/apply/'+userId +'/'+id)
             .then(result=> {
               toast.success('Congratulations! Your application was successfully submitted!');
   
               console.log(result)
              // navigate('/dash')
             })
             .catch(err => {
               // Handle the error based on the error message
               if (err.response && err.response.data && err.response.data.error) {
                 // Display the error message from the backend
                 toast.error(err.response.data.error);
               } else {
                 // Display a generic error message
                 toast.error('An error occurred while applying to the offer.');
               }
               console.log(err);
             });
           }
   
   
   
  return (
    <>
    <Header/>
    <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">Shop</h1>
    <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item"><a href="#">Pages</a></li>
        <li className="breadcrumb-item active text-white">Shop</li>
    </ol>
    </div>

<div className="container-fluid py-5 mt-5">
            <div className="container py-5">
                <div className="row g-4 mb-5">
                    <div className="col-lg-8 col-xl-9">
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="border rounded">
                                <div className="fruite-img">
                                                    {/* <img src={offer.image} className="img-fluid w-100 rounded-top" alt=""/> */}
                                                    <img src="img/featur-1.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                                                </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h4 className="fw-bold mb-3">{Title}</h4>
                                <p className="mb-3">Experience required: {Experience_required}</p>
                               
                                <p className="mb-4">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                                <p className="mb-4">Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish</p>
                              
                                <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={Update}>
  <i className=" me-2 text-primary"></i>
  Apply Now
</button>                            </div>
                            <div className="col-lg-12">
                                <nav>
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                            id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                            aria-controls="nav-about" aria-selected="true">Description</button>
                                    </div>
                                </nav>
                                <div className="tab-content mb-5">
                                    <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                        <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.
                                            Susp endisse ultricies nisi vel quam suscipit </p>
                                        <p>Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish filefish Antarctic
                                            icefish goldeye aholehole trumpetfish pilot fish airbreathing catfish, electric ray sweeper.</p>
                                        <div className="px-2">
                                            <div className="row g-4">
                                                <div className="col-6">
                                                    <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Experience required</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{Experience_required} </p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Domain</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{Domain}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Mission</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{Mission} </p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Salary</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{Salary}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Speciality</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{Speciality} </p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Job Type</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{JobType}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Job City</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{JobCity} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="nav-vision" role="tabpanel">
                                        <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                            amet diam et eos labore. 3</p>
                                        <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                            Clita erat ipsum et lorem et sit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 {/*    <div className="col-lg-4 col-xl-3">
                        <div className="row g-4 fruite">
                            <div className="col-lg-12">
                                <div className="input-group w-100 mx-auto d-flex mb-4">
                                    <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>
                                <div className="mb-4">
                                    <h4>Categories</h4>
                                    <ul className="list-unstyled fruite-categorie">
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Apples</a>
                                                <span>(3)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Oranges</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Strawbery</a>
                                                <span>(2)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Banana</a>
                                                <span>(8)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex justify-content-between fruite-name">
                                                <a href="#"><i className="fas fa-apple-alt me-2"></i>Pumpkin</a>
                                                <span>(5)</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
     </>
  )
}

export default ApplyOffer