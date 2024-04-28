import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useParams ,useNavigate} from 'react-router-dom';
import Header from '../HomePage/Header';
import useAuth from '../../hooks/useAuth';

function UpdateOffer() {
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
          axios.patch('http://localhost:3500/offers/'+id,{Title,Experience_required,Domain,Mission,Salary,Speciality,JobType,JobCity})
          .then(result=> {
            console.log(result)
            navigate(`/dash/ownedoffers/${userId}`)
          })
          .catch(err => console.log(err) )
        }



  return (
    <>
    <div>
        <Header />
        
    </div>
    <section className="contact-us" id="contact" style={{ marginTop: '100px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 align-self-center">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form onSubmit={Update} id="contact" className="card p-4">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2>Update offer</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Title" className="form-label my-3">Title:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={Title} onChange={(e)=>SetTitle(e.target.value)} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Experience_required" className="form-label my-3">Experience required:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={Experience_required} onChange={(e)=>SetExperience_required(e.target.value)} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Domain" className="form-label my-3">Domain:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={Domain} onChange={(e)=>SetDomain(e.target.value)} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Mission" className="form-label my-3">Mission:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={Mission} onChange={(e)=>SetMission(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Salary" className="form-label my-3">Salary:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={Salary} onChange={(e)=>SetSalary(e.target.value)} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Speciality" className="form-label my-3">Speciality:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={Speciality} onChange={(e)=>SetSpeciality(e.target.value)} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="JobType" className="form-label my-3">Job Type:</label>
                                                    <select id="JobType" className="form-control" name="JobType" value={JobType} onChange={(e)=>SetJobType(e.target.value)} required>
                                                        <option value="">Select Job Type</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Contract">Contract</option>
                                                        <option value="Summer internship">Summer internship</option>
                                                        <option value="PFE">PFE</option>
                                                    </select>
                                                    
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="JobCity" className="form-label my-3">Job City:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={JobCity} onChange={(e)=>SetJobCity(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">Update Offer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

</>
  );
}

export default UpdateOffer;