import React from 'react';
import useAuth from '../../hooks/useAuth';

// Define the roles
export const ROLES = {
    Student: 'Student',
    Recruter: 'Recruter',
    Teacher: 'Teacher',
    Alumni: 'Alumni',
    Admin: 'Admin'
}

// Define the component
const Profile = () => {
    // Get user data and roles using custom hook
    const { username, email, isStudent, isAdmin, isRecruter, isTeacher, isAlumni } = useAuth();

    // Determine the user's role
    let userRole = '';
    if (isAdmin) {
        userRole = ROLES.Admin;
    } else if (isStudent) {
        userRole = ROLES.Student;
    } else if (isRecruter) {
        userRole = ROLES.Recruter;
    } else if (isTeacher) {
        userRole = ROLES.Teacher;
    } else if (isAlumni) {
        userRole = ROLES.Alumni;
    }

    // Render user data based on role
    return (
        <div>
            <h2>User Information</h2>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {userRole}</p>
            
            {/* You can add more user data based on the role if needed */}
        </div>
    );
}

export default Profile;
