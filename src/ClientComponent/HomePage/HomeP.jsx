import Header from './Header.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx'


function HomeP  ()  {
    /* const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState('volvo');
    const [priceRange, setPriceRange] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleCategorySelection = (category) => {
        setSelectedCategory(category);
    };

    // Sample data for products (replace with your actual data)
    const products = [
        {
            id: 1,
            name: 'Grapes',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
            price: 4.99,
            image: 'img/fruite-item-1.jpg',
        },
        {
            id: 2,
            name: 'Apples',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
            price: 3.99,
            image: 'img/fruite-item-2.jpg',
        },
        // Add more product objects as needed
    ]; */
    const [offers, setOffers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { userId,email,isAlumni, isStudent, isAdmin ,isRecruter} = useAuth()
  
    const navigate = useNavigate();

    useEffect(() => {
      const fetchOffers = async () => {
        try {
          const response = await fetch(`http://localhost:3500/offers?q=${searchQuery}`);
          const data = await response.json();
          setOffers(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchOffers();
    }, [searchQuery]);
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
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
      navigate(`./updateoffer/${offerId}`);
  }
  const navigateToApply = (offerId) => {
    navigate(`./apply/${offerId}`);
  }
  

    return (
        <>
        <Header/>
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">Home</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item"/>
                <li className="breadcrumb-item active text-white"></li>
            </ol>
        </div>
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <div className="input-group w-100 mx-auto d-flex">
                                    <input
                                        type="search"
                                        className="form-control p-3"
                                        placeholder="keywords"
                                        /* value={searchInput}
                                        onChange={handleSearchInputChange} */
                                    />
                                    <span className="input-group-text p-3">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                    <label htmlFor="fruits">Default Sorting:</label>
                                    <select
                                        id="fruits"
                                        name="fruitlist"
                                        className="border-0 form-select-sm bg-light me-3"
                                        form="fruitform"
                                       /*  value={sortBy}
                                        onChange={handleSortByChange} */
                                    >
                                        <option value="volvo">Nothing</option>
                                        <option value="saab">Popularity</option>
                                        <option value="opel">Organic</option>
                                        <option value="audi">Fantastic</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4">
                           {/*  <div className="col-lg-3">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>Categories</h4>
                                            <ul className="list-unstyled fruite-categorie">
                                                <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#" onClick={() => handleCategorySelection('Apples')} ><i className="fas fa-apple-alt me-2"></i>Apples</a>
                                                        <span>(3)</span>
                                                    </div>
                                                </li>
                                             
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4 className="mb-2">Price</h4>
                                            <input
                                                type="range"
                                                className="form-range w-100"
                                                id="rangeInput"
                                                name="rangeInput"
                                                min="0"
                                                max="500"
                                              value={priceRange}
                                                onChange={handlePriceRangeChange} 
                                            />
                                            <output id="amount" name="amount" min-value="0" max-value="500" htmlFor="rangeInput">{priceRange} </output>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <h4>Additional</h4>
                                            <div className="mb-2">
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <h4 className="mb-3">Featured products</h4>
                                        <div className="d-flex align-items-center justify-content-start">
                                            
                                        </div>
                                        <div className="d-flex justify-content-center my-4">
                                            <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">View More</a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-9">
                                <div className="row g-4 justify-content-center">
                                    {offers.map(offer => (
                                        <div key={offer.id} className="col-md-6 col-lg-6 col-xl-4">
                                            <div className="rounded position-relative fruite-item">
                                                <div className="fruite-img">
                                                    {/* <img src={offer.image} className="img-fluid w-100 rounded-top" alt=""/> */}
                                                    <img src="img/featur-1.jpg" className="img-fluid w-100 rounded-top" alt=""/>
                                                </div>
                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                    <h4>{offer.Title}</h4>
                                                    <p>{offer.Salary}</p>
                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                        <p className="text-dark fs-5 fw-bold mb-0">{offer.JobCity}</p>
                                                        
                                                        <button className="btn border border-secondary rounded-pill px-3 text-primary"onClick={(e) => navigateToApply(offer._id)} >
                                                            <i className="me-2 text-primary"></i> Apply
                                                          </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-12">
                                    <div className="pagination d-flex justify-content-center mt-5">
                                        {/* Add pagination links */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default HomeP;
