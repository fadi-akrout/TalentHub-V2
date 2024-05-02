import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Dashboard/Footer';
import Header from '../HomePage/Header';

function EvenementForm() {
    const navigate = useNavigate();
    const formatDateTimeLocal = (date) => {
        const ten = (i) => (i < 10 ? '0' : '') + i;
        return `${date.getFullYear()}-${ten(date.getMonth() + 1)}-${ten(date.getDate())}T${ten(date.getHours())}:${ten(date.getMinutes())}`;
    };
    const [formData, setFormData] = useState({
        nom: '',
        adresse: '',
        dateDebut: formatDateTimeLocal(new Date()),
        dateFin: '',
        description: '',
        image: ''
    });
    const [errors, setErrors] = useState({});

    // Function to validate individual fields
    const validateForm = () => {
        let newErrors = {};
        if (!formData.nom.trim()) newErrors.nom = "Event name is required";
        if (!formData.adresse.trim()) newErrors.adresse = "Adress is required";
        if (!formData.dateDebut) newErrors.dateDebut = "Starting date is required";
        if (!formData.dateFin) newErrors.dateFin = "Ending date is required";
        if (new Date(formData.dateDebut) >= new Date(formData.dateFin)) {
            newErrors.dateFin = "The starting date must be before the ending date";
        }
        if (!formData.description.trim()) newErrors.description = "Description is required";

        setErrors(newErrors); // Use setErrors to update the state
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Optionally, you could validate individual fields on change here as well
    };

    const handleBlur = () => {
        validateForm();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Perform validation checks here if needed, for example:
            // Check the file size
            if (file.size > 1024 * 1024 * 5) { // for 5MB
                setErrors(prevErrors => ({ ...prevErrors, image: 'File size should not exceed 5MB.' }));
                return;
            }

            // Check the file type
            if (!file.type.match('image.*')) {
                setErrors(prevErrors => ({ ...prevErrors, image: 'Please select a valid image.' }));
                return;
            }

            // If no errors, clear any existing error message for image
            setErrors(prevErrors => ({ ...prevErrors, image: '' }));

            const reader = new FileReader();
            reader.onload = (upload) => {
                setFormData(prev => ({ ...prev, image: upload.target.result }));
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, set an error
            setErrors(prevErrors => ({ ...prevErrors, image: 'Please select an image.' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3500/evenements', formData);
                console.log(response.data);
                navigate('/dash/evenements');
            } catch (error) {
                console.error("Il y a eu un problème avec l'envoi du formulaire :", error);
            }
        }
    };
    return (
        <>
            <Header />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <section className="contact-us" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 align-self-center">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form id="contact" onSubmit={handleSubmit} className="card p-4">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2>Add an Event</h2>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="nom" className="form-label">Event name</label>
                                                <input type="text" id="nom" className="form-control" name="nom"
                                                    value={formData.nom} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.nom && <div className="text-danger">{errors.nom}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="adresse" className="form-label">Adress </label>
                                                <input type="text" id="adresse" className="form-control" name="adresse"
                                                    value={formData.adresse} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.adresse && <div className="text-danger">{errors.adresse}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="dateDebut" className="form-label">Starting date </label>
                                                <input type="datetime-local" id="dateDebut" name="dateDebut" className="form-control"
                                                    value={formData.dateDebut} onChange={handleChange} required />
                                                {errors.dateDebut && <div className="text-danger">{errors.dateDebut}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="dateFin" className="form-label">Ending date</label>
                                                <input type="datetime-local" id="dateFin" className="form-control" name="dateFin"
                                                    value={formData.dateFin} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.dateFin && <div className="text-danger">{errors.dateFin}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea id="description" className="form-control" name="description"
                                                    value={formData.description} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.description && <div className="text-danger">{errors.description}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="imageUpload" className="form-label">Image</label>
                                                <input className="form-control" type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} />
                                                {errors.image && <div className="text-danger">{errors.image}</div>}
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add event </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EvenementForm;
