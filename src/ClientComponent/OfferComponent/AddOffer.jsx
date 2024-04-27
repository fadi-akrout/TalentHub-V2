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
      Domain: '',
      Mission: '',
      Salary: '',
      Speciality: '',
      JobType: '',
      JobCity: '',
  
    });
    const [errors, setErrors] = useState({});
      // Function to validate individual fields
      const validateForm = () => {
        let newErrors = {};
        if (!formData.Title.trim()) newErrors.Title = "Title is required .";
        if (!formData.Experience_required.trim()) newErrors.Experience_required = "Experience required.";
        if (!formData.Domain.trim()) newErrors.Domain = "Domain is required.";
        if (!formData.Mission.trim()) newErrors.Mission = "Mission is required.";
        if (!formData.Salary) newErrors.Salary = "Salary is required.";
        if (!formData.Speciality.trim()) newErrors.Speciality = "Speciality is required.";
        if (!formData.JobType.trim()) newErrors.JobType = "Job Type is required.";
        if (!formData.JobCity.trim()) newErrors.JobCity = "Job City is required.";
  
  
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
        navigate('/HomeP');
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
    <div className="container-fluid py-5">
            <div className="container py-5">
               
                <form  onSubmit={handleSubmit}>
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Title
                                        </label>
                                        <input type="text" id="Title" className="form-control" name="Title" value={formData.Title} onChange={handleChange}  onBlur={handleBlur} required />
                        {errors.Title && <div className="text-danger">{errors.Title}</div>}
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100">
                                        <label className="form-label my-3">Experience required
                                           
                                        </label>
                                        <input type="text" id="Experience_required" className="form-control" name="Experience_required" value={formData.Experience_required} onChange={handleChange}  onBlur={handleBlur} required />
                                                  {errors.Experience_required && <div className="text-danger">{errors.Experience_required}</div>}

                                    </div>
                                </div>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Domain
                                    
                                </label>
                                <input type="text" id="Domain" className="form-control" name="Domain" value={formData.Domain} onChange={handleChange} onBlur={handleBlur}  required />
                                                  {errors.Domain && <div className="text-danger">{errors.Domain}</div>}

                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Mission 
                                    
                                </label>
                                <input type="text" id="Mission" className="form-control" name="Mission" value={formData.Mission} onChange={handleChange} onBlur={handleBlur}  required />
                                                  {errors.Mission && <div className="text-danger">{errors.Mission}</div>}

                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Salary
                                    
                                </label>
                                <input type="number" id="Salary" className="form-control" name="Salary" value={formData.Salary} onChange={handleChange}  onBlur={handleBlur} required />
                                                  {errors.Salary && <div className="text-danger">{errors.Salary}</div>}

                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Speciality
                                  
                                </label>
                                <input type="text" id="Speciality" className="form-control" name="Speciality" value={formData.Speciality} onChange={handleChange}  onBlur={handleBlur} required />
                                                  {errors.Speciality && <div className="text-danger">{errors.Speciality}</div>}
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Job Type
                                    
                                </label>
                                <select id="JobType" className="form-control" name="JobType" value={formData.JobType} onChange={handleChange}  onBlur={handleBlur} required>
                                                    {errors.JobType && <div className="text-danger">{errors.JobType}</div>}

                            <option value="">Select Job Type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Summer internship">Summer internship</option>
                            <option value="PFE">PFE</option>
                          </select>
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">Job City
                                     
                                </label>
                                <input type="text" id="JobCity" className="form-control" name="JobCity" value={formData.JobCity} onChange={handleChange} onBlur={handleBlur}  required />
                                                  {errors.JobCity && <div className="text-danger">{errors.JobCity}</div>}
                            </div>
                           
                           
                          {/*   <div className="form-item">
                                <textarea name="text" className="form-control" spellCheck="false" cols="30" rows="11" placeholder="Order Notes (Optional)"></textarea>
                            </div> */}
                        </div>
                    </div>

                    <button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"style={{ marginTop: '20px' }}>
  <i className=" me-2 text-primary"></i>
  Add Offer
</button>                  </form>
            </div>
        </div>


    </>
  )
}

export default AddOffer