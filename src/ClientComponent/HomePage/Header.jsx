import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,

  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
function Header() {


  const { username, email, isStudent, isAdmin, isRecruter } = useAuth()
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        // Assuming 768px is your breakpoint for the mobile menu
        setSuggestions([]); // Hide suggestions when resizing to a wider screen
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // A mock function to simulate getting search suggestions
  // This should be replaced with a real search suggestion function
  const getSearchSuggestions = (value) => {
    // Here you would typically make an API call to get suggestions
    // For the purposes of this example, we'll use static data
    const allSuggestions = [
      'ajout evenements',
      'ajout offer',
      'tous les evenements'
      // ... more suggestions
    ];
    return allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      setSuggestions(getSearchSuggestions(value));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    // Here you would navigate based on the suggestion
    // For example:
    if (suggestion === 'ajout event') {
      navigate('/dash/add-event');
    } else if (suggestion === 'ajout offer') {
      navigate('/dash/addoffer');
    }
    else if (suggestion === 'evenements') {
      navigate('/dash/evenements');
    }
    // Add more conditions for different suggestions and routes here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSuggestions([]);
    // Navigate based on the search term
    // Example logic (needs to be adapted to your actual search routes)
    if (searchTerm.toLowerCase().includes('ajout event')) {
      navigate('/dash/add-event');
    } else if (searchTerm.toLowerCase().includes('ajout offer')) {
      navigate('/dash/addoffer');
    }
    else if (searchTerm.toLowerCase().includes('evenements')) {
      navigate('/dash/evenements');
    }
    // Add more conditions for different search terms and routes here
    setSearchTerm(''); // Clear the search input after navigation
  };

  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/dash')
  }, [isSuccess, navigate])

  const onNewNoteClicked = () => navigate('/dash/notes/new')
  const onNewUserClicked = () => navigate('/dash/users/new')
  const onNotesClicked = () => navigate('/dash/notes')
  const onUsersClicked = () => navigate('/dash/users')

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }

  let newNoteButton = null
  if (isAdmin) {
    if (NOTES_REGEX.test(pathname)) {
      newNoteButton = (
        <button
          className="icon-button"
          title="New Note"
          onClick={onNewNoteClicked}
        >
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
      )
    }
  }

  let newUserButton = null
  /*  if (isAdmin) {
     if (USERS_REGEX.test(pathname)) {
       newUserButton = (
         <li className="nav-item text-center mx-2 mx-lg-1">
           <Link to="./new" className="nav-link">
             <div>
               <FontAwesomeIcon icon={faUserPlus} className="fa-lg mb-1" />
             </div>
             Add User
           </Link>
         </li>
       )
     }
   } */

  let userButton = null
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (

        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to="/dash/users" className="nav-link">
            <div>
              <FontAwesomeIcon icon={faUserGear} className="fa-lg mb-1" />
            </div>
            Users
          </Link>
        </li>
      )
    }
  }

  let notesButton = null

   if (isAdmin) {
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
      notesButton = (
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to="/dash/cv" className="nav-link">
            <div>
              <FontAwesomeIcon icon={faFilePen} className="fa-lg mb-1" />
            </div>
            CV Extracting
          </Link>
        </li>
      )

    }
  } 
  let jobsButton = null
   if (isAdmin) {
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
      jobsButton = (
        <li className="nav-item text-center mx-2 mx-lg-1">
          <Link to="/dash/job" className="nav-link">
            <div>
              <FontAwesomeIcon icon={faFilePen} className="fa-lg mb-1" />
            </div>
            Job Extracting
          </Link>
        </li>
      )

    }
  } 

  const logoutButton = (
    <li className="nav-item text-center mx-2 mx-lg-1">
      <Link to="/" className="nav-link" onClick={sendLogout}>
        <div>
          <FontAwesomeIcon icon={faRightFromBracket} className="fa-lg mb-1" />
        </div>
        Logout
      </Link>
    </li>
  )

  const errClass = isError ? "errmsg" : "offscreen"
  let buttonContent
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {jobsButton}
        {userButton}
        {logoutButton}
      </>
    )
  }
    return (
        <>


                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-md">
                        <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">TalentHub</h1></a>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <a href="index.html" className="nav-item nav-link active">Home</a>
                                <a href="shop.html" className="nav-item nav-link">Shop</a>
                                <a href="shop-detail.html" className="nav-item nav-link">Shop Detail</a>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <a href="cart.html" className="dropdown-item">Cart</a>
                                        <a href="chackout.html" className="dropdown-item">Chackout</a>
                                        <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                        <a href="404.html" className="dropdown-item">404 Page</a>
                                    </div>
                                </div>
                                {(isAdmin || isRecruter) && <li><Link to="/dash/stats" className="nav-link px-2 link-dark">Statistics</Link></li>}
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>
                                <a href="#" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x"></i>
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: "-5px", left: "15px", height: "20px", minwidth: "20px" }}>3</span>
                                </a>
                                <a href="#" className="my-auto">
                                    <i className="fas fa-user fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
        </>
    )
}

export default Header