/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




function OfferList() {
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:3500/offers')
            .then(response => {
                setOffers(response.data);
            })
            .catch(error => {
                console.error("Il y a eu une erreur !", error);
            });
    }, []);
    const handleDelete = (id) => {
        axios.delete('http://localhost:3500/offers/' + id)
            .then(response => {
                console.log(response)
                window.location.reload();
            })
            .catch(error => {
                console.error("Il y a eu une erreur !", error);
            });

    }
    const navigateToUpdateOffer = (offerId) => {
        navigate(`/updateoffer/${offerId}`);
    }

    // Slice the offers array to display only the first four offers
    const displayedOffers = offers.slice(0, 4);

    const generatePDFOffers = () => {
        const doc = new jsPDF();

        offers.forEach((offer, index) => {
            if (index > 0) {
                doc.addPage();
            }

            doc.setFontSize(16);
            doc.text(offer.Title, 14, 20);
            doc.setFontSize(10);
            doc.text(`Experience Required: ${offer.Experience_required}`, 14, 30);
            doc.text(`Description: ${offer.Description}`, 14, 40);
            doc.text(`Mission: ${offer.Mission}`, 14, 50);
            doc.text(`Salary: ${offer.Salary}`, 14, 60);
            doc.text(`Speciality: ${offer.Speciality}`, 14, 70);
            doc.text(`Job Type: ${offer.JobType}`, 14, 80);
            doc.text(`Job City: ${offer.JobCity}`, 14, 90);
        });

        doc.save('Job_Offers.pdf');
    };
    return (
        <>
            <section className="upcoming-meetings" id="meetings">
                <div className="container">
                    <div className="row">
                        {displayedOffers.map(offer => (
                            <div key={offer._id} className="col-lg-6 col-md-6 col-sm-12">
                                <div className="meeting-item">
                                    <div className="thumb">
                                        <div className="price"></div>
                                        <img src="assets/images/meeting-01.jpg" alt="New Lecturer Meeting" />
                                    </div>
                                    <div className="down-content">
                                        <div className="job-offer">
                                            <h4 className="job-title">{offer.Title}</h4>
                                            <div className="job-details">
                                                <p className="job-info"><span className="info-label"><strong>Experience Required:</strong></span> {offer.Experience_required}</p>
                                                <p className="job-info"><span className="info-label"><strong>Salary:</strong></span> {offer.Salary}</p>
                                                <p className="job-info"><span className="info-label"><strong>Speciality:</strong></span> {offer.Speciality}</p>
                                                <p className="job-info"><span className="info-label"><strong>Job Type:</strong></span> {offer.JobType}</p>
                                                <p className="job-info"><span className="info-label"><strong>Job City:</strong></span> {offer.JobCity}</p>
                                            </div>
                                        </div>
                                        <div className="main-button-red">
                                            <li className="scroll-to-section"><Link to="/signup">Apply now</Link></li>
                                        </div>
                                        <div>
                                            <button onClick={generatePDFOffers} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px' }}>Generate PDF of Offers</button>

                                        </div>
                                     </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </section>

        </>
    );
}

export default OfferList; */