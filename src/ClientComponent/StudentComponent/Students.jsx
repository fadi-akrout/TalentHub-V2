import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderClient from '../Dashboard/HeaderClient';
import Footer from '../Dashboard/Footer';

function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error loading students", error));
    }, []);

    const handleDelete = async (studentId) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const response = await axios.delete(`http://localhost:3500/students/${studentId}`);
                if (response.status === 200 || response.status === 204) {
                    setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
                }
            } catch (error) {
                console.error("Error deleting student", error);
            }
        }
    };

    const handleEdit = (studentId, updatedData) => {
        axios.patch(`http://localhost:3500/students/${studentId}`, updatedData)
            .then(response => {
                setStudents(prevStudents => prevStudents.map(student => {
                    if (student._id === studentId) {
                        return { ...student, ...response.data };
                    }
                    return student;
                }));
            })
            .catch(error => console.error("Error updating student", error));
    };

    return (
        <>
            <HeaderClient />
            <section className="upcoming-meetings" id="meetings">
                <div className="container my-5">
                    <h1 className="text-center mb-4">List of Students</h1>
                    {students.map(student => (
                        <Student
                            key={student._id}
                            student={student}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
                <Footer />
            </section>
        </>
    );
}

function Student({ student, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...student });

    const activateEdit = () => setIsEditing(true);
    const deactivateEdit = () => setIsEditing(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const saveChanges = () => {
        onEdit(student._id, editedData);
        deactivateEdit();
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {isEditing ? (
                    <>
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control mb-2" name="name" value={editedData.name} onChange={handleChange} placeholder="Name" required />
                        <input type="text" className="form-control mb-2" name="lastname" value={editedData.lastname} onChange={handleChange} placeholder="Lastname" required />
                        <input type="email" className="form-control mb-2" name="email" value={editedData.email} onChange={handleChange} placeholder="Email" required />
                        <input type="text" className="form-control mb-2" name="diploma" value={editedData.diploma} onChange={handleChange} placeholder="Diploma" required />
                        <input type="text" className="form-control mb-2" name="actualPost" value={editedData.actualPost} onChange={handleChange} placeholder="Actual Post" required />
                        <input type="number" className="form-control mb-2" name="nbrYearsOfExperience" value={editedData.nbrYearsOfExperience} onChange={handleChange} placeholder="Number of Years of Experience" required />
                        <input type="text" className="form-control mb-2" name="lastPostOccupied" value={editedData.lastPostOccupied} onChange={handleChange} placeholder="Last Post Occupied" required />
                        <div className="mb-2">
                            <label htmlFor="cv" className="form-label">CV (PDF only):</label>
                            <input type="file" accept=".pdf" name="cv" id="cv" className="form-control" onChange={handleChange} required />
                        </div>
                        <input type="date" className="form-control mb-2" name="dateOfBirth" value={editedData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control mb-2" name="address" value={editedData.address} onChange={handleChange} placeholder="Address" required />
                        <input type="text" className="form-control mb-2" name="city" value={editedData.city} onChange={handleChange} placeholder="city" required />
                        <input type="text" className="form-control mb-2" name="postalCode" value={editedData.postalCode} onChange={handleChange} placeholder="postalCode" required />
                        <input type="text" className="form-control mb-2" name="country" value={editedData.country} onChange={handleChange} placeholder="country" required />
                        <input type="text" className="form-control mb-2" name="phoneNumber" value={editedData.phoneNumber} onChange={handleChange} placeholder="phoneNumber" required />
                        <input type="text" className="form-control mb-2" name="skills" value={editedData.skills} onChange={handleChange} placeholder="skills" required />
                        <input type="text" className="form-control mb-2" name="languages" value={editedData.languages} onChange={handleChange} placeholder="languages" required />
                        <input type="text" className="form-control mb-2" name="linkedinProfile" value={editedData.linkedinProfile} onChange={handleChange} placeholder="linkedinProfile" required />
                        <div className="mb-2">
                            <label htmlFor="profileImage" className="form-label">Profile Image:</label>
                            <input type="file" accept=".png, .jpg, .jpeg" name="profileImage" id="profileImage" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                </div>
                        <button className="btn btn-success me-2" onClick={saveChanges}>Save</button>
                        <button className="btn btn-secondary" onClick={deactivateEdit}>Cancel</button>
                    </>
                ) : (
                    <>
                    
                        <h5 className="card-title">{student.name} {student.lastname}</h5>
                        <h6 className="card-text">Email: {student.email}</h6>
                        <p className="card-text">Address: {student.address}</p>
                        <p className="card-text">Diploma: {student.diploma}</p>
                        <p className="card-text">skills: {student.skills}</p>
                        <p className="card-text">Actual Post: {student.actualPost}</p>
                        {student.image && <img src={student.image} className="card-img-bottom" alt="Event" style={{ maxWidth: '20%', height: 'auto' }} />}
                        
                        <MdDeleteForever onClick={() => onDelete(student._id)} style={{ cursor: 'pointer', float: 'right', color: 'red', marginLeft: '10px' }} />
                        <FaEdit onClick={activateEdit} style={{ cursor: 'pointer', float: 'right', color: '#0d6efd' }} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Students;
