import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../HomePage/Header';
import Footer from '../Dashboard/Footer';

const AcceptedUsers = () => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAcceptedUsers() {
      try {
        const response = await axios.get(`http://localhost:3500/offers/acceptedList/${id}`);
        setAcceptedUsers(response.data.flat());
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchAcceptedUsers();
  }, [id]);

  return (
    <>
      <Header />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Accepted Users</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"></li>
          <li className="breadcrumb-item"></li>
          <li className="breadcrumb-item active text-white"></li>
        </ol>
      </div>

      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {acceptedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.roles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AcceptedUsers;