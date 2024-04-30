import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserList = ({ offerId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3500/offers/userList/${offerId}`);
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [offerId]);

  const handleAcceptCandidate = async (userId) => {
    try {
      await axios.put(`http://localhost:3500/offers/accept/${offerId}/users/${userId}`);
      toast.success("Candidate has been accepted for this offer")
      // Refresh the user list after accepting the candidate
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast.error('Candidate has already been accepted');
          break;
        case 401:
          toast.error('Unauthorized');
          break;
        case 404:
          toast.error('User has not applied to this offer');
          break;
        case 500:
          toast.error('Internal server error');
          break;
        default:
          toast.error('An error occurred');
          break;
      }
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  /* if (error) {
    return <div>-{error}!</div>;
  } */

  return (
    <div>
      <h2>Users Applied to this Offer</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
           {/*  <div>
              <strong>Username:</strong> {user.username}
            </div> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <strong>Email:</strong> {user.email} 
              <button className="btn border border-secondary rounded-pill px-1 py-1 mb-4 text-primary" style={{ marginTop: '20px', marginLeft: 'auto' }} onClick={() => handleAcceptCandidate(user._id)}>Accept Candidate</button>
            </div>
            <div>{error}</div>
           
           {/*  <div>
              <strong>Roles:</strong> {user.roles.join(', ')}
            </div> */}
          </li>
        ))}
      </ul>
      <ToastContainer/>
    </div>
  );
};

export default UserList;