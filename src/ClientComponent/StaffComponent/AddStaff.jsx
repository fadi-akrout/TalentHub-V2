import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Dashboard/Footer';
import Header from '../HomePage/Header';
import useAuth from '../../hooks/useAuth'


function StaffForm() {
    const { userId } = useAuth()

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        actualPost: '',
        lastPostOccupied: '',
        address: '',
        phoneNumber: '',
     
    });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.lastname.trim()) newErrors.lastname = "Lastname name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.lastPostOccupied.trim()) newErrors.lastPostOccupied = "last Post Occupied is required";

        if (!formData.actualPost.trim()) newErrors.actualPost = "actualPost is required";
        if (!formData.nbrYearsOfExperience.trim()) newErrors.nbrYearsOfExperience = "Years of experience is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
     

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleBlur = () => {
        validateForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verify that all fields are filled
        const areFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
        if (!areFieldsFilled) {
            alert("Please fill in all fields.");
            return;
        }
        const formDataWithUserId = {
            ...formData,
            user: userId // assuming userId is the correct property name
        };

        // If all checks pass, proceed with submission
        try {
            const response = await axios.post('http://localhost:3500/staff', formDataWithUserId);
            console.log(response.data);
            // Redirect to the Profile component and pass the staff data
            navigate('/dash');

        } catch (error) {
            console.error("There was a problem with form submission:", error);
        }
    };

    return (
        <>
         <Header/>
         <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">Profile</h1>
    <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item"></li>
        <li className="breadcrumb-item"></li>
        <li className="breadcrumb-item active text-white"></li>
    </ol>
    </div>
    <section className="contact-us" id="contact" style={{ marginTop: '100px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 align-self-center">
                        <div className="row">
                            <div className="col-lg-12">
                                <form onSubmit={handleSubmit} id="contact" className="card p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h2>Complete Your Profile</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name:</label>
                                                <input type="text" id="name" className="form-control" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.name && <div className="text-danger">{errors.name}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="lastname" className="form-label">Lastname:</label>
                                                <input type="text" id="lastname" className="form-control" name="lastname" value={formData.lastname} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email:</label>
                                                <input type="email" id="email" className="form-control" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Address:</label>
                                                <input type="text" id="address" className="form-control" name="address" value={formData.address} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.address && <div className="text-danger">{errors.address}</div>}
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="col-md-6">
                                           
                                            <div className="mb-3">
                                                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                                                <input type="text" id="phoneNumber" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="actualPost" className="form-label">Actual Post:</label>
                                                <input type="text" id="actualPost" className="form-control" name="actualPost" value={formData.actualPost} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.actualPost && <div className="text-danger">{errors.actualPost}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="lastPostOccupied" className="form-label">Last Post Occupied:</label>
                                                <input type="text" id="lastPostOccupied" className="form-control" name="lastPostOccupied" value={formData.lastPostOccupied} onChange={handleChange} onBlur={handleBlur} required />
                                                {errors.lastPostOccupied && <div className="text-danger">{errors.lastPostOccupied}</div>}
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <button type="submit" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">Submit</button>
                                </form>
                            </div>
                        </div>
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

export default StaffForm;
