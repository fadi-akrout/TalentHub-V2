import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import Header from '../HomePage/Header';
import Footer from '../Dashboard/Footer';
function Evenements() {
    const [evenements, setEvenements] = useState([]);
    const { userId, isAdmin, isTeacher, isRecruter } = useAuth();

    useEffect(() => {
        axios.get('http://localhost:3500/evenements')
            .then(response => {
                setEvenements(response.data);
            })
            .catch(error => {
                console.error("Error loading events", error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Events</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item active text-white"></li>
            </ol>
        </div>
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <h1 className="text-center mb-4">Welcome to our Events!</h1>
                        <div className="row g-4">
                            {evenements.map((evenement) => (
                                <Evenement
                                    key={evenement._id}
                                    evenement={evenement}
                                    setEvenements={setEvenements}
                                    isAdmin={isAdmin}
                                    isTeacher={isTeacher}
                                    isRecruter={isRecruter}
                                    userId={userId}
                                />
                            ))}
                        </div>
                        {/*  {(isAdmin || isRecruter || isTeacher) && (
                            <div className="text-center mt-4">
                                <Link to="/dash/add-event" className="btn btn-danger">Add Event</Link>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

function Evenement({ evenement, setEvenements, isAdmin, isTeacher, isRecruter, userId }) {
    const [isParticipating, setIsParticipating] = useState(evenement.participants.includes(userId));

    const handleDelete = async () => {
        if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS EVENT")) {
            try {
                const response = await axios.delete(`http://localhost:3500/evenements/${evenement._id}`);
                if (response.status === 200 || response.status === 204) {
                    setEvenements(prev => prev.filter(ev => ev._id !== evenement._id));
                }
            } catch (error) {
                console.error("Error deleting event", error);
            }
        }
    };

    const handleParticipate = async () => {
        try {
            const response = await axios.post(`http://localhost:3500/evenements/${evenement._id}/participate`, { userId });
            if (response.status === 200) {
                alert('Your participation has been recorded');
                setIsParticipating(true);
            } else {
                alert('Error during participation: Unsuccessful response status');
            }
        } catch (error) {
            console.error('Error during participation:', error);
            alert(`Error during participation: ${error.message}`);
        }
    };

    const handleCancelParticipation = async () => {
        try {
            const response = await axios.post(`http://localhost:3500/evenements/${evenement._id}/annulerParticipation`, { userId });
            if (response.status === 200) {
                alert('Votre annulation de participation a été enregistrée');
                setIsParticipating(false);
                // Mise à jour de l'état si nécessaire...
            } else {
                alert('Erreur lors de l\'annulation de la participation: Statut de réponse non réussi');
            }
        } catch (error) {
            console.error('Erreur lors de l\'annulation de la participation:', error.response || error.message);
            alert(`Erreur lors de l'annulation de la participation: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        
        <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card rounded position-relative fruite-item h-100 shadow">
                {evenement.image && (
                    <div className="fruite-img">
                        <img src={evenement.image} className="img-fluid w-100 rounded-top" alt={evenement.nom} />
                    </div>
                )}
                <div className="card-body">
                    <h4 className="card-title">{evenement.nom}</h4>
                    <p className="card-text">{evenement.description}</p>
                </div>
                <div className="card-footer bg-white d-flex justify-content-between flex-wrap">
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                        <i className="fa fa-info me-2 text-primary"></i> Details
                    </a>
                    {isAdmin || isTeacher || isRecruter ? (
                        <>
                            <FaEdit style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => { /* function to edit event */ }} />
                            <MdDeleteForever style={{ cursor: 'pointer', color: 'red' }} onClick={handleDelete} />
                        </>
                    ) : null}
                    {isParticipating ? (
                        <button className="btn btn-warning" onClick={handleCancelParticipation}>Cancel</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleParticipate}>Participate</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Evenements;
