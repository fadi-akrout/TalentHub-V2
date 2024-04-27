import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../HomePage/Header';
import PDFGeneratorButton from './PDFGeneratorButton';
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
  } from 'mdb-react-ui-kit';

  function StudentProfile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams(); 
const IA= async()=>{
    try {
        const response = await axios.get('http://localhost:3500/IA/processCV');
    } catch (error) {
        console.error('Erreur IA', error);
    }
}
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/students/a/${id}`);
                setProfile(response.data);
            } catch (error) {
                setError('Erreur lors du chargement du profil');
                console.error('Erreur lors du chargement du profil', error);
            }
        };

        fetchProfile();
    }, [id]); // Dépendance à l'ID pour recharger le profil si l'ID change

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!profile) {
        return <div>Loading profile...</div>;
    }
    const candidate = {
        name: profile.name,
        lastname: profile.lastname,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        linkedinProfile: profile.linkedinProfile,
        nbrYearsOfExperience: profile.nbrYearsOfExperience,
        diploma: profile.diploma,
        skills: profile.skills, 
        languages: profile.languages, 
    };

    const formattedDateOfBirth = new Date(profile.dateOfBirth).toLocaleDateString();


    return (
        <>
            <Header />
            <section>
                <div className="profile-container">
                    <h1 className='st'>Student Profile</h1>
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                        <MDBCol lg="6">
                            <MDBCard className="mb-8">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText><strong>Full Name</strong></MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{profile.name} {profile.lastname}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText><strong>Email</strong></MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{profile.email}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Diploma</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.diploma}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Actual Post</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.actualPost}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Number Years Of Experience</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.nbrYearsOfExperience}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>lastPostOccupied</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.lastPostOccupied}</MDBCardText>
                    </MDBCol>
                    </MDBRow><hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Date Of Birth</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{new Date(profile.dateOfBirth).toLocaleDateString()}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Address</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.address}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>City</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.city}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Phone Number</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.phoneNumber}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Skills</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.skills.join(', ')}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>Languages</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.languages.join(', ')}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                    <MDBCol sm="3">
                        <MDBCardText><strong>LinkedIn Profile</strong></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.linkedinProfile}</MDBCardText>
                    </MDBCol>
                    </MDBRow>
                    <PDFGeneratorButton candidate={candidate} />
                
                    <br></br>  <Link to="/dash/cv" className="btn btn-danger">Extract data from CV</Link>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
            </div>
        </section>
    </>
    );
}
export default StudentProfile;
