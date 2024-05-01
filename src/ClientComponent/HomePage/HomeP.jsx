import Header from './Header.jsx';
import Footer from '../Dashboard/Footer.jsx'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx'
import Chatbot from '../Chatbot/Chatbot.jsx';

function HomeP  ()  {
  
    const [offers, setOffers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { userId,email,isAlumni, isStudent, isAdmin ,isRecruter} = useAuth()
  
    const navigate = useNavigate();

    useEffect(() => {
      const fetchOffers = async () => {
        try {
          const response = await fetch(`http://localhost:3500/offers?q=${searchQuery}`);
          const data = await response.json();
          setOffers(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchOffers();
    }, [searchQuery]);
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
    const handleDelete = (id) => {
      axios.delete('http://localhost:3500/offers/' + id)
          .then(response => {
              console.log(response)
              window.location.reload();
          })
          .catch(error => {
              console.error("Il y a eu une erreur !", error);
          });
  
  }
  const navigateToUpdateOffer = (offerId) => {
      navigate(`./updateoffer/${offerId}`);
  }
  const navigateToApply = (offerId) => {
    navigate(`./apply/${offerId}`);
  }
  

    return (
        <>
        <Header/>
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Home</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item active text-white"></li>
            </ol>
        </div>
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <div className="input-group w-100 mx-auto d-flex">
                                    <input
                                        type="search"
                                        className="form-control p-3"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                    <span className="input-group-text p-3">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                         
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="mb-3" style={{marginTop:"50px"}}>
                                            <h4>Job Types</h4>
                                            <ul className="list-unstyled fruite-categorie">
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a ><i ></i>Full time</a>
                                                       
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a  ><i ></i>Part Time</a>
                                                        
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a ><i ></i>Contract</a>
                                                       
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a ><i ></i>Summer internship</a>
                                                      
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a  ><i ></i>PFE</a>
                                                     
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                 
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>Additional</h4>
                                            <div className="mb-2">
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <h4 className="mb-3">Explore our events</h4>
                                        <div className="d-flex align-items-center justify-content-start">
                                            
                                        </div>
                                        <div className="d-flex justify-content-center my-4">
                                             <Link to="evenements"  className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"> 
                                               View More
                                             </Link>  
                                          
                                        </div>
                                    </div>
                                </div>
                            </div> 








                            <div className="col-lg-9" style={{ marginTop: "65px" }}>
    <div className="row g-4 justify-content-center">
        {offers.map(offer => (
            <div key={offer.id} className="col-md-6 col-lg-6 col-xl-4">
                <div className="rounded position-relative fruite-item d-flex flex-column h-100">
                    <div className="fruite-img">
                        <img src={offer.profileImage} className="img-fluid w-100 rounded-top" alt="" />
                    </div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom flex-grow-1">
                        <strong><h4>{offer.Title}</h4></strong>
                        <p>{offer.Salary}</p>
                        <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">{offer.JobCity}</p>
                            <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={(e) => navigateToApply(offer._id)}>
                                <i className="me-2 text-primary"></i> Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Chatbot/>
        <Footer/>
        </>
    );
};

export default HomeP;
