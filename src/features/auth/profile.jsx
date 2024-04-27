import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function profile() {
    const { userId, isStudent, isRecruter, isAlumni, isTeacher } = useAuth()
    const navigate = useNavigate();
    const [hasUserRelation, setHasUserRelation] = useState(false);

    useEffect(() => {
        const fetchDataRecruiter = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/recruiters/${userId}`);
                setHasUserRelation(response.data.hasUserRelation);
                console.log("recruiters", response.data.hasUserRelation);
                if (response.data.hasUserRelation && isRecruter) navigate('/dash')
            } catch (error) {
                console.error('Error fetching recruiter:', error);
            }
        };


        const fetchDataStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/students/${userId}`);
                setHasUserRelation(response.data.hasUserRelation);
                console.log("students", response.data.hasUserRelation);
                let id = response.data.student._id;
                if (response.data.hasUserRelation && isStudent) navigate(`/dash/ProfileStudent/${id}`)
            } catch (error) {
                console.error('Error fetching recruiter:', error);
            }
        };
        const fetchDataAlumni = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/alumnis/${userId}`);
                setHasUserRelation(response.data.hasUserRelation);
                console.log("alumnis", response.data.hasUserRelation);
                if (response.data.hasUserRelation && isAlumni) navigate('/dash')
            } catch (error) {
                console.error('Error fetching recruiter:', error);
            }
        };
        const fetchDataStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/staff/${userId}`);
                setHasUserRelation(response.data.hasUserRelation);
                console.log("staff", response.data.hasUserRelation);
                if (response.data.hasUserRelation && isTeacher) navigate('/dash')
            } catch (error) {
                console.error('Error fetching recruiter:', error);
            }
        };

        fetchDataRecruiter();
        fetchDataStudent();
        fetchDataAlumni();
        fetchDataStaff();
    }, [userId]);

    useEffect(() => {

        if (isStudent) navigate('/dash/AddStudent')
        if (isRecruter) navigate('/dash/add-recruiter')
        if (isAlumni) navigate('/dash/AddAlumni')
        if (isTeacher) navigate('/dash/staff')
    }, [isStudent, isRecruter, isAlumni, isTeacher, navigate])

    return (
        <div>
            <h1>Profile</h1>
            {hasUserRelation && <p>User has relation with recruiter</p>}
        </div>
    )
}

export default profile