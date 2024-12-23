import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import generatePDFOffers from '../generatePDFOffers'; // Make sure this path is correct
import { MdDeleteForever } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
//import Feedback from '../HomePage/FeedBack';
import Header from '../HomePage/Header';
import UserList from './OfferUserList'; // Import the UserList component
import AcceptedUsers from './AcceptedUsers'; // Import the UserList component
import Footer from '../Dashboard/Footer';
function OwnedOfferListRecruiter() {
  const [offers, setOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { userId, isAlumni, isStudent, isAdmin, isRecruter } = useAuth();
  const [error, setError] = useState(null); // State variable for error handling

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`http://localhost:3500/offers/offerOwner/${userId}`);
        if (!response.ok) throw new Error("Recruiter does not have any offer");
        const data = await response.json();
        setOffers(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchOffers();
  }, [userId]); // Add userId to the dependency array

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3500/offers/${id}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const navigateToUpdateOffer = (offerId) => {
    navigate(`/dash/updateoffer/${offerId}`);
  };

  const navigateToApply = (offerId) => {
    navigate(`./apply/${offerId}`);
  };

  const handleGeneratePDF = (offerIds) => {
   // const offerIds = offers.map((offer) => offer._id);
   console.log('generate pdf', offerIds);
    generatePDFOffers(offerIds);
  };

  if (error) {
    return (
      <>
        <div>
          <Header />
        </div>
        <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">My offers</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>

      <div className="container-fluid py-5" >
        <div className="container py-5">


        <section className="upcoming-meetings" id="meetings">
          <section className="contact-us" id="contact">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-10">
                      <div>
                        <p style={{ color: 'red' }}>-{error}</p>
                        {/* You can add additional components or styling here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        </div>
            </div>
            <Footer/>

      </>
    );
  }

  return (
    <>
      
        <Header />

       <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">My offers</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item" />
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>

     {/*  <section className="upcoming-meetings" id="meetings"style={{marginTop :"200px"}}>
        <section className="contact-us" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 align-self-center">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <input
                      type="text"
                      id="Search"
                      className="form-control"
                      name="Search"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      placeholder="Search offers..."
                      style={{ padding: '10px', margin: '10px', marginTop: '-250px' }}
                    />
                  </div>

                  <div className="container" style={{ padding: '10px', margin: '10px', marginTop: '-150px' }}>
                    <div className="row justify-content-center">
                      {offers.map((offer) => (
                        <div key={offer._id} className="justify-content-center col-lg-10 col-md-6 col-sm-8 mb-6">
                          <div className="card h-100">
                            <img src={offer.profileImage} className="card-img-top w-50" alt="Offer" />
                            <div className="card-body">
                              <h5 className="card-title">{offer.Title}</h5>
                              <p className="card-text">{offer.Mission}</p>
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                  <strong>Experience Required:</strong> {offer.Experience_required}
                                </li>
                                <li className="list-group-item">
                                  <strong>Salary:</strong> {offer.Salary}
                                </li>
                                <li className="list-group-item">
                                  <strong>Speciality:</strong> {offer.Speciality}
                                </li>
                                <li className="list-group-item">
                                  <strong>Job Type:</strong> {offer.JobType}
                                </li>
                                <li className="list-group-item">
                                  <strong>Job City:</strong> {offer.JobCity}
                                </li>
                              
                              </ul>
                            
                              {(isAdmin || isRecruter) && (
                                <>
                                  <MdDeleteForever
                                    onClick={() => handleDelete(offer._id)}
                                    style={{ cursor: 'pointer', float: 'right', color: 'red', marginLeft: '10px' }}
                                  />
                                  <FaEdit
                                    onClick={() => navigateToUpdateOffer(offer._id)}
                                    style={{ cursor: 'pointer', float: 'right', color: '#0d6efd' }}
                                  />
                                </>
                              )}
                              <UserList offerId={offer._id} /> 
                             
                              <button className="btn border border-primary rounded px-1 py-1 mb-4 text-sucess" style={{marginRight :"5px"}}><Link to={`/dash/accepted/${offer._id}`}>User Accepted List</Link></button> 
                              <button className="btn border border-secondary rounded px-1 py-1 mb-4 text-sucess" onClick={() => handleGeneratePDF(offer._id)}>
                                Generate PDF of Offers
                              </button>
                              <button className="btn border border-primary rounded px-1 py-1 mb-4 text-sucess" style={{marginLeft :"5px"}}><Link to={`/dash/addQuiz/${offer._id}`}>Add Quiz</Link></button> 
                             
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-12 text-center">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </section> */}

<div className="container-fluid testimonial py-5">
  <div className="container py-5">
    <div className="testimonial-header text-center">
      <h4 className="text-primary">Check your Offers status</h4>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',flexDirection:"row"}}>
      {offers.map((offer) => (
        <div className="testimonial-item img-border-radius bg-light rounded p-4 d-flex flex-column align-items-center" style={{ marginTop: "20px", width: "80%" }}>
          <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
            <div className="bg-secondary rounded" style={{ marginLeft: "20px" }}>
              <img src={offer.profileImage} className="img-fluid rounded" style={{ width: '400px', height: '200px' }} alt="" />
            </div>
            <div className="ms-4 d-block " >
              <h1 className="text-dark"style={{ marginLeft: '-550px' }}>{offer.Title}</h1>
              <h4 className="text-dark"style={{ marginLeft: '-550px' }}>{offer.Salary}</h4>
              <h4 className="text-dark"style={{ marginLeft: '-550px' }}>{offer.JobType}</h4>
              <h4 className="text-dark"style={{ marginLeft: '-550px' }}>{offer.JobCity}</h4>
            </div>
          </div>
          {(isAdmin || isRecruter) && (
            <div className="d-flex justify-content-end w-100" style={{ marginTop: "50px" }}>
              <MdDeleteForever onClick={() => handleDelete(offer._id)} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
              <FaEdit onClick={() => navigateToUpdateOffer(offer._id)} style={{ cursor: 'pointer', marginLeft: '10px', color: '#0d6efd' }} />
            </div>
          )}
          <UserList offerId={offer._id} /> {/* Add the UserList component */}
          <div className="d-flex justify-content-center w-100" style={{ marginTop: "20px" }}>
            <button className="btn border border-primary rounded px-1 py-1 mb-4 text-success me-2">
              <Link to={`/dash/accepted/${offer._id}`}>User Accepted List</Link>
            </button>
            <button className="btn border border-secondary rounded px-1 py-1 mb-4 text-success" onClick={() => handleGeneratePDF(offer._id)}>
              Generate PDF for the offer
            </button>
            <button className="btn border border-primary rounded px-1 py-1 mb-4 text-success me-2" style={{ marginLeft: "5px" }}>
              <Link to={`/dash/addQuiz/${offer._id}`}>Add Quiz</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      <Footer/>

    </>
  );
}

export default OwnedOfferListRecruiter;