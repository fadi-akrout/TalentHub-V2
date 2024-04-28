import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import generatePDFOffers from '../generatePDFOffers'; // Make sure this path is correct
import { MdDeleteForever } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
//import Feedback from '../HomePage/FeedBack';
import Header from '../HomePage/Header';
import UserList from './OfferUserList'; // Import the UserList component

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

  const handleGeneratePDF = () => {
    generatePDFOffers(offers); // Assuming generatePDFOffers accepts an array of offer objects
  };

  if (error) {
    return (
      <>
        <div>
          <Header />
        </div>
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

      
      </>
    );
  }

  return (
    <>
      
        <Header />
      
      <section className="upcoming-meetings" id="meetings">
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
                            <img src="../../assets/images/meeting-01.jpg" className="card-img-top" alt="Offer" />
                            <div className="card-body">
                              <h5 className="card-title">{offer.Title}</h5>
                              <p className="card-text">{offer.Mission}</p>
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                  <strong>Experience Required:</strong> {offer.Experience_required}
                                </li>
                                <li className="list-group-item">
                                  <strong>Domain:</strong> {offer.Domain}
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
                               {/*  <li className="list-group-item">
                                  <Feedback offerId={offer._id} />
                                </li> */}
                              </ul>
                              {/*  {(isStudent || isAlumni) &&
                                <button type="submit" className="btn btn-danger" onClick={() => navigateToApply(offer._id)}>Apply now</button>
                              } */}
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
                              <UserList offerId={offer._id} /> {/* Add the UserList component */}
                              <button className="btn btn-primary" onClick={handleGeneratePDF}>
                                Generate PDF of Offers
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-12 text-center">
                        {/*   <button className="btn btn-primary" onClick={handleGeneratePDF}>Generate PDF of Offers</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

     
    </>
  );
}

export default OwnedOfferListRecruiter;