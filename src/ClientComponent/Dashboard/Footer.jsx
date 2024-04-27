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

  return (
    <div className="footer" style={{ textAlign: 'center' }}>
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
    </div>
  );
}

export default Footer;