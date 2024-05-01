import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const { userId, username, email, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate('/dash');

    {/* <div className="footer" style={{ textAlign: 'center' }}>
      <p>
        Copyright © 2024 Phoenix., Ltd.
        <br />
        Design: <a href="#">Phoenix</a>
      </p>
      <div>
        <p>Current User: {username}</p>
        <p>Status: {status}</p>
        <p>Email: {email}</p>
      </div>
    </div> */}
  
    return (
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
          <div className="container py-5">
              <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
                  <div className="row g-4">
                      <div className="col-lg-3">
                          <a href="#">
                              <h1 className="text-primary mb-0">TalentHub</h1>
                          </a>
                      </div>
                    
                    
                  </div>
              </div>
              <div className="row g-5">
                  <div className="col-lg-4 col-md-4">
                      <div className="footer-item">
                          <h4 className="text-light mb-3">Why People Like us!</h4>
                          <p className="mb-4">typesetting, remaining essentially unchanged. It was 
                              popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                          <a  className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
                      </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                      <div className="footer-item">
                          <h4 className="text-light mb-3">Contact</h4>
                          <p>Address: Esprit</p>
                          <p>Email: TalentHub@esprit.tn</p>
                          <p>Phone: +0123 4567 8910</p>
                          <p>Payment Accepted</p>
                          <img src="img/payment.png" className="img-fluid" alt="" />
                      </div>
                     
                  </div>
                  <div className="col-lg-3 col-md-6">
                        <div className="d-flex flex-column text-start footer-item">
                            <h4 className="text-light mb-3">User Info</h4>
                            <p>Current User: {username}</p>
                            <p>Status: {status}</p>
                            <p>Email: {email}</p>
                            <p>
                             Copyright © 2024 Phoenix., Ltd.
                             <br />
                             Design: <a href="#">Phoenix</a>
                            </p>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  );
}

export default Footer;