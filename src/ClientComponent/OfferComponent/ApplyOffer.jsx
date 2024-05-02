import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth'
import Header from '../HomePage/Header.jsx'
import Footer from '../Dashboard/Footer.jsx';
import Map from './Maps.jsx';
import "./maps.css";
import TranslateDescription from './TranslateDescription.jsx';


function ApplyOffer() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [Title, SetTitle] = useState()
    const [Experience_required, SetExperience_required] = useState()
    const [Description, SetDescription] = useState()
    const [Mission, SetMission] = useState()
    const [Salary, SetSalary] = useState()
    const [Speciality, SetSpeciality] = useState()
    const [JobType, SetJobType] = useState()
    const [JobCity, SetJobCity] = useState()
    const [profileImage, SetprofileImage] = useState()
    const [quiz, setQuiz] = useState();  // Note the lowercase 'q
    const [offer, setOffer] = useState({});

    const { userId, isStudent, isAlumni } = useAuth()



    useEffect(() => {
        axios.get('http://localhost:3500/offers/getoffer/' + id)
            .then(response => {
                console.log(response)
                // setOffers(response.data);
                SetTitle(response.data.Title);
                SetExperience_required(response.data.Experience_required);
                SetDescription(response.data.Description);
                SetMission(response.data.Mission);
                SetSalary(response.data.Salary);
                SetSpeciality(response.data.Speciality);
                SetJobType(response.data.JobType);
                SetJobCity(response.data.JobCity);
                SetprofileImage(response.data.profileImage);
                setQuiz(response.data.quiz); // Note the lowercase 'q' here
                console.log(response.data.quiz);
                console.log("offerId", id);



            })
            .catch(error => {
                console.error("Il y a eu une erreur !", error);
            });
    }, []);




    const Update = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3500/offers/apply/' + userId + '/' + id)
            .then(result => {
                toast.success('Congratulations! Your application was successfully submitted!');

                console.log(result)
                navigate('/dash/cv')
            })
            .catch(err => {
                // Handle the error based on the error message
                if (err.response && err.response.data && err.response.data.error) {
                    // Display the error message from the backend
                    toast.error(err.response.data.error);
                } else {
                    // Display a generic error message
                    toast.error('An error occurred while applying to the offer.');
                }
                console.log(err);
            });
    }



    return (
        <>
            <Header />
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Offer details</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"></li>
                    <li className="breadcrumb-item"></li>
                    <li className="breadcrumb-item active text-white"></li>
                </ol>
            </div>

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="border rounded">
                                        <div className="fruite-img">
                                            <img src={profileImage} className="img-fluid w-100 rounded-top" alt="" />

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{Title}</h4>
                                    <p className="mb-3">Experience required: {Experience_required}</p>

                                    <p style={{ overflowWrap: 'break-word' }}>{Description}</p>
                                    {(isStudent || isAlumni) && <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={Update}>
                                        <i className=" me-2 text-primary"></i>
                                        Apply Now
                                    </button>}                          </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                                aria-controls="nav-about" aria-selected="true">Description</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            <p style={{ overflowWrap: 'break-word' ,marginTop:"20px",marginBottom :"20px", padding :"20px"}}><TranslateDescription description={Description} /></p>

                                            <div className="px-2">
                                                <div className="row g-4">
                                                    <div className="col-6">
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Experience required</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{Experience_required} </p>
                                                            </div>
                                                        </div>

                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Mission</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{Mission} </p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Salary</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{Salary} DT</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Speciality</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{Speciality} </p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Job Type</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{JobType}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Job City</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{JobCity} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">
                                    <div className="input-group w-100 mx-auto d-flex mb-4">

                                    </div>
                                    <div className="mb-4">
                                        <h4>Relative Quizz</h4>
                                        <p>By acing the quiz, you significantly increase your chances of securing the job and standing out as a top candidate.</p>
                                        <div className="d-flex justify-content-center my-4">
                                            {/*  {offer.quiz ? (
                                                <button className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100" onClick={handleQuizButtonClick}>
                                                    Pass Quiz
                                                </button>
                                            ) : (
                                                <button className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100" disabled>
                                                    No Quiz Available
                                                </button>
                                            )} */}
                                            <Link to={`/dash/quiz/${id}`}>
                                            <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" >
                                              <i className=" me-2 text-primary"></i>
                                               Start Quiz
                                            </button>   
                                     </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            <p style={{ overflowWrap: 'break-word' }}>Map</p>
                            <div className="maps">
                                <Map JobCity={JobCity} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
            <Footer />
        </>
    )
}

export default ApplyOffer