import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import Header from '../HomePage/Header';
import Footer from '../Dashboard/Footer';
import '../OfferComponent/Card.css'
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

    const handleDelete = async (id) => {
        if (window.confirm("ARE YOU SURE YOU WANT TO DELETE THIS EVENT")) {
            try {
                const response = await axios.delete(`http://localhost:3500/evenements/${id}`);
                if (response.status === 200 || response.status === 204) {
                    setEvenements(prev => prev.filter(ev => ev._id !== id));
                    toast.success("Event successfully deleted.");
                }
            } catch (error) {
                console.error("Error deleting event", error);
                toast.error("Failed to delete event.");
            }
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Events</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"/>
                    <li className="breadcrumb-item"/>
                    <li className="breadcrumb-item active text-white"></li>
                </ol>
            </div>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <h1 className="text-center mb-4">Welcome to our Events!</h1>
                        <div className="row g-4">
                            {evenements.map((evenement) => (
                                <Evenement
                                    key={evenement._id}
                                    evenement={evenement}
                                    isAdmin={isAdmin}
                                    isTeacher={isTeacher}
                                    isRecruter={isRecruter}
                                    userId={userId}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

function Evenement({ evenement, isAdmin, isTeacher, isRecruter, userId, onDelete }) {
    const [isParticipating, setIsParticipating] = useState(evenement.participants.includes(userId));
    const handleParticipate = async () => {
        try {
            const response = await axios.post(`http://localhost:3500/evenements/${evenement._id}/participate`, { userId });
            if (response.status === 200) {
                setIsParticipating(true);  // Update the participation status
                toast.success('Participation confirmed! You will receive a confirmation email shortly.');  // Show success toast
            } else {
                toast.error(response.data.message || 'Error during participation');
            }
        } catch (error) {
            console.error('Error during participation:', error);
            toast.error(`Error during participation: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancelParticipation = async () => {
        try {
            const response = await axios.post(`http://localhost:3500/evenements/${evenement._id}/annulerParticipation`, { userId });
            if (response.status === 200) {
                toast.success('Your participation is canceled');
                setIsParticipating(false);
            } else {
                toast.error('Erreur lors de l\'annulation de la participation: Statut de réponse non réussi');
            }
        } catch (error) {
            console.error('Erreur lors de l\'annulation de la participation:', error);
            toast.error(`Erreur lors de l'annulation de la participation: ${error.message}`);
        }
    };

    return (
        <div className="col-md-6 col-lg-4">
  <div className="card mb-4 h-100">
    {evenement.image && (
      <div className="position-relative">
        <img src={evenement.image} className="card-img-top" alt={evenement.nom} style={{ height: "200px", objectFit: "cover" }} />
      </div>
    )}
    <div className="card-body">
      <h5 className="card-title">{evenement.nom}</h5>
      <p className="card-text">{evenement.description}</p>
    </div>
    <div className="card-footer bg-white d-flex justify-content-between">
      <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
        <i className="fa fa-info me-2 text-primary"></i> Details
      </a>
      {isAdmin || isTeacher || isRecruter ? (
        <>
          <FaEdit style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => { /* function to edit event */ }} />
          <MdDeleteForever style={{ cursor: 'pointer', color: 'red' }} onClick={() => onDelete(evenement._id)} />
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
