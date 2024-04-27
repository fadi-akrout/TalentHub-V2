import React, { useState } from 'react';
import { useGetFilteredUsersQuery } from "./usersApiSlice"; // Import the new hook
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader';
import Header from "../../ClientComponent/HomePage/Header";
import Footer from "../../ClientComponent/Dashboard/Footer";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState(''); // State to store selected role
    const usersPerPage = 5;

    // Use useGetFilteredUsersQuery hook to fetch users based on selected role
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFilteredUsersQuery(selectedRole, { // Pass the selected role as an argument
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    // Options for select dropdown
    const roleOptions = ['Student', 'Recruiter', 'Teacher', 'Alumni', 'Admin'];

    let content;

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value); // Update selected role when select value changes
    }

    if (isLoading) {
        content = <PulseLoader color={"#FFF"} />;
    } else if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    } else if (isSuccess) {
        const { ids } = users;

        // Logic to calculate current users based on pagination
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = ids.slice(indexOfFirstUser, indexOfLastUser);

        // Render users for the current page
        const tableContent = currentUsers.map(userId => <User key={userId} userId={userId} />);

        // Pagination component
        const totalPages = Math.ceil(ids.length / usersPerPage);
        const pagination = (
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );

        content = (
            <>
                <Header />
                <section className="contact-us" id="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 align-self-center">
                                <div>
                                    <select value={selectedRole} onChange={handleRoleChange}>
                                        <option value="">Select Role</option>
                                        {roleOptions.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                                <table className="table table--users">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Roles</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableContent}
                                    </tbody>
                                </table>
                                {pagination}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="upcoming-meetings" id="meetings">
                    <Footer />
                </section>
            </>
        );
    }

    return content;
};

export default UsersList;
