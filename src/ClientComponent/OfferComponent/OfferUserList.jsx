import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Card.css';
import ResultScore from './ResultScore';
import ResultScoreAdmin from './ResultScoreAdmin';
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
      <h4>Users Applied to this Offer</h4>
     
       
        
     
      <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', flexDirection:"row"}}>
    {users.map((user) => (
        <div key={user._id} className="card red" style={{ margin: '5px', padding: '10px', minWidth: '100px', maxWidth: '200px' }}>
            <p className="second-text"style={{ margin: '10px' }}>{user.email}</p>
            <ResultScoreAdmin offerId={offerId} userId={user._id}/>
            <button className="btn border border-secondary rounded-pill px-1 py-1 mb-4 text-dark" style={{ margin: '10px' }} onClick={() => handleAcceptCandidate(user._id)}>Accept Candidate</button>
        </div>
    ))}
</div>


            <div>{error}</div>
           
      
       
      

      <ToastContainer/>
    </div>
  );
};

export default UserList;