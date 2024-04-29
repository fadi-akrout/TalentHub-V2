import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useParams ,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth'
import Header from '../HomePage/Header'

function AddOffer() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      Title: '',
      Experience_required: '',
      Description: '',
      Mission: '',
      Salary: '',
      Speciality: '',
      JobType: '',
      JobCity: '',
      profileImage: null,

  
    });
    const [errors, setErrors] = useState({});
      // Function to validate individual fields
      const validateForm = () => {
        let newErrors = {};
        if (!formData.Title.trim()) newErrors.Title = "Title is required .";
        if (!formData.Experience_required.trim()) newErrors.Experience_required = "Experience required.";
        if (!formData.Description.trim()) newErrors.Description = "Description is required.";
        if (!formData.Mission.trim()) newErrors.Mission = "Mission is required.";
        if (!formData.Salary) newErrors.Salary = "Salary is required.";
        if (!formData.Speciality.trim()) newErrors.Speciality = "Speciality is required.";
        if (!formData.JobType.trim()) newErrors.JobType = "Job Type is required.";
        if (!formData.JobCity.trim()) newErrors.JobCity = "Job City is required.";
        if (!formData.profileImage) newErrors.profileImage = "Profile image is required.";

  
        setErrors(newErrors); // Use setErrors to update the state
        return Object.keys(newErrors).length === 0;
    };
  
    const handleBlur = () => {
      validateForm();
  };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          // Perform validation checks here if needed, for example:
          // Check the file size
          if (file.size > 1024 * 1024 * 5) { // for 5MB
              setErrors(prevErrors => ({ ...prevErrors, profileImage: 'File size should not exceed 5MB.' }));
              return;
          }

          // Check the file type
          if (!file.type.match('image.*')) {
              setErrors(prevErrors => ({ ...prevErrors, profileImage: 'Please select a valid image.' }));
              return;
          }

          // If no errors, clear any existing error message for image
          setErrors(prevErrors => ({ ...prevErrors, profileImage: '' }));

          const reader = new FileReader();
          reader.onload = (upload) => {
              setFormData(prev => ({ ...prev, profileImage: upload.target.result }));
          };
          reader.readAsDataURL(file);
      } else {
          // If no file is selected, set an error
          setErrors(prevErrors => ({ ...prevErrors, profileImage: 'Please select an image.' }));
      }
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Vérifiez que tous les champs sont remplis
      const areFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
      if (!areFieldsFilled) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
  
      // Si les vérifications sont passées, continuez avec la soumission
      try {
        const response = await axios.post('http://localhost:3500/offers', formData);
        console.log(response.data);
        navigate('/dash');
      } catch (error) {
        console.error("Il y a eu un problème avec l'envoi du formulaire :", error);
      }
    };
  return (
    <>
    <Header/>
    <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Add offer</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item"/>
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
                                                <h2>Add offer</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Title" className="form-label my-3">Title:</label>
                                                    <input type="text" id="Title" className="form-control" name="Title" value={formData.Title} onChange={handleChange} onBlur={handleBlur} required />
                                                    {errors.Title && <div className="text-danger">{errors.Title}</div>}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Experience_required" className="form-label my-3">Experience required:</label>
                                                    <input type="text" id="Experience_required" className="form-control" name="Experience_required" value={formData.Experience_required} onChange={handleChange} onBlur={handleBlur} required />
                                                    {errors.Experience_required && <div className="text-danger">{errors.Experience_required}</div>}
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <label htmlFor="Mission" className="form-label my-3">Post:</label>
                                                    <input type="text" id="Mission" className="form-control" name="Mission" value={formData.Mission} onChange={handleChange} onBlur={handleBlur} required />
                                                    {errors.Mission && <div className="text-danger">{errors.Mission}</div>}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Salary" className="form-label my-3">Salary:</label>
                                                    <input type="number" id="Salary" className="form-control" name="Salary" value={formData.Salary} onChange={handleChange} onBlur={handleBlur} required />
                                                    {errors.Salary && <div className="text-danger">{errors.Salary}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                               
                                                <div className="mb-3">
                                                    <label htmlFor="Speciality" className="form-label my-3">Speciality:</label>
                                                    <input type="text" id="Speciality" className="form-control" name="Speciality" value={formData.Speciality} onChange={handleChange} onBlur={handleBlur} required />
                                                    {errors.Speciality && <div className="text-danger">{errors.Speciality}</div>}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="JobType" className="form-label my-3">Job Type:</label>
                                                    <select id="JobType" className="form-control" name="JobType" value={formData.JobType} onChange={handleChange} onBlur={handleBlur} required>
                                                        <option value="">Select Job Type</option>
                                                        <option value="Full Time">Full Time</option>
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Contract">Contract</option>
                                                        <option value="Summer internship">Summer internship</option>
                                                        <option value="PFE">PFE</option>
                                                    </select>
                                                    {errors.JobType && <div className="text-danger">{errors.JobType}</div>}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="JobCity" className="form-label my-3">Job City:</label>
                                                    <input type="text" id="JobCity" className="form-control" name="JobCity" value={formData.JobCity} onChange={handleChange} onBlur={handleBlur} required />
                                                    {errors.JobCity && <div className="text-danger">{errors.JobCity}</div>}
                                                </div>
                                                <div className="mb-3">
                                                         <label htmlFor="profileImage" className="form-label" style={{marginTop:"25px"}}>Image:</label>
                                                         <input type="file" accept=".png, .jpg, .jpeg" id="profileImage" className="form-control" name="profileImage" onChange={handleImageChange} onBlur={handleBlur} />
                                                         {errors.profileImage && <div className="text-danger">{errors.profileImage}</div>}
                                                     </div>  
                                            </div> 
                                            <div className="mb-3">
                                                    <label htmlFor="Description" className="form-label my-3">Description:</label>
                                                    <textarea name="Description" className="form-control" spellCheck="false" cols="30" rows="11" placeholder="Order Notes (Optional)" value={formData.Description} onChange={handleChange} onBlur={handleBlur} required></textarea>
{errors.Description && <div className="text-danger">{errors.Description}</div>}

                                                </div>
                                        </div>
                                        <button type="submit" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">Add Offer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default AddOffer