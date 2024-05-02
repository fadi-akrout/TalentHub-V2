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
import Footer from "../Dashboard/Footer"
import '../OfferComponent/Card.css';
import './Profile.css'

  function StudentProfile() {
    const [tooltipVisibility, setTooltipVisibility] = useState({
        twitter: false,
        instagram: false,
        facebook: false,
        linkedin: false
    });
    
    const handleTooltipToggle = (key) => {
        setTooltipVisibility(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };
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
        adress: profile.adress, 

    };

    const formattedDateOfBirth = new Date(profile.dateOfBirth).toLocaleDateString();


    return (
        <>
            <Header />
            <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Add offer</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item active text-white"></li>
            </ol>
        </div>
          {/*   <section>
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
        </section> */}
         <div className="container-fluid testimonial py-5">
      <div className="container py-5">
        <div className="testimonial-header text-center">
          <h1>{profile.name} {profile.lastname}</h1>
          <h1 className="display-5 mb-5 text-dark"></h1>
        </div>
    
<div className="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',flexDirection:"row"}}>
<div className="card-client" style={{width :"400px",height :"300px"}}>
            <div className="user-picture">
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                </svg>
            </div>
            <p className="name-client">
               {profile.name}
                <span>               {profile.email}
                  </span>
            {new Date(profile.dateOfBirth).toLocaleDateString()}
            </p>
            <div className="social-media">
                <a onMouseEnter={() => handleTooltipToggle('twitter')} onMouseLeave={() => handleTooltipToggle('twitter')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                    {tooltipVisibility.twitter && <span className="tooltip-social">Twitter</span>}
                </a>
                <a  onMouseEnter={() => handleTooltipToggle('instagram')} onMouseLeave={() => handleTooltipToggle('instagram')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                    {tooltipVisibility.instagram && <span className="tooltip-social">Instagram</span>}
                </a>
                <a  onMouseEnter={() => handleTooltipToggle('facebook')} onMouseLeave={() => handleTooltipToggle('facebook')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                    {tooltipVisibility.facebook && <span className="tooltip-social">LinkedIn</span>}
                </a>
                <a  onMouseEnter={() => handleTooltipToggle('linkedin')} onMouseLeave={() => handleTooltipToggle('linkedin')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                    </svg>
                    {tooltipVisibility.linkedin && <span className="tooltip-social">Facebook</span>}
                </a>
            </div>
        </div>
  
        <div className="card" style={{ width: "870px", height: "300px", display: "flex", justifyContent: "flex-start" }}>
      <div className="row" style={{ marginLeft: "-500px" }}>
        <h5 style={{ marginTop: "50px", marginLeft: "-20px" }}>Full Name: {profile.name} {profile.lastname}</h5>
        <h5 style={{ marginTop: "30px" }}>Email: {profile.email}</h5>
        <h5 style={{ marginTop: "30px", marginLeft: "-45px" }}>Number: {profile.phoneNumber}</h5>
      </div>
    </div>
<div className="card" style={{ width: "800px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div>
        <h6 style={{ marginTop: "10px" }}>Skills: {profile.skills.join(', ')}</h6>
        <h6 style={{ marginTop: "10px" }}>Languages: {profile.languages.join(', ')}</h6>
      </div>
    </div>
    <div className="card" style={{ width: "470px", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div>
        <h6>Years Of Experience: {profile.nbrYearsOfExperience}</h6>
        <h6>Diploma: {profile.diploma}</h6>
      </div>
    </div>
</div>
      </div>
    </div>
  
                
                 
                  
        <Footer/>
    </>
    );
}
export default StudentProfile;
