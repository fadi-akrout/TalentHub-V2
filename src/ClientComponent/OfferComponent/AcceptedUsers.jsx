import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptedUsers = ({ offerId }) => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);

  useEffect(() => {
    async function fetchAcceptedUsers() {
      try {
        const response = await axios.get(`http://localhost:3500/offers/acceptedList/${offerId}`);
        setAcceptedUsers(response.data.flat());
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchAcceptedUsers();
  }, [offerId]);

  return (
    <div>
      <h2>Accepted Users</h2>
      <ul>
        {acceptedUsers.map((user) => (
          <li key={user._id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <strong>Email:</strong> {user.email}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedUsers;