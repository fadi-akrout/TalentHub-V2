import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Users Applied to this Offer</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
           {/*  <div>
              <strong>Username:</strong> {user.username}
            </div> */}
            <div>
              <strong>Email:</strong> {user.email}
            </div>
           {/*  <div>
              <strong>Roles:</strong> {user.roles.join(', ')}
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;