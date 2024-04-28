import React from 'react'
import '../../../public/css/style.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faSignInAlt ,
  faRightFromBracket,
  faUserPlus 
} from "@fortawesome/free-solid-svg-icons"
function HeaderClient() {
    return (
        <>
       
        <div className="container-fluid fixed-top">
            <div className="container topbar bg-primary d-none d-lg-block">
                <div className="d-flex justify-content-between">
                    <div className="top-info ps-2">
                        <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">Esprit</a></small>
                        <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">TalentHub@esprit.tn</a></small>
                    </div>
                    <div className="top-link pe-2">
                        <a  className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                        <a className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                        <a  className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                    </div>
                </div>
            </div>
            <div className="container px-0">
                <nav className="navbar navbar-light bg-white navbar-expand-md">
                    <a href="/" className="navbar-brand"><h1 className="text-primary display-6">Talent Hub</h1></a>
                    <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars text-primary"></span>
                    </button>
                    <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                       
                        <div className="ms-auto  d-flex m-3 me-0">

     
      
     <Link to="/login" className="nav-link" >
        <div>
           <FontAwesomeIcon icon={faSignInAlt} className="fa-lg mb-1" />
        </div>
        Login
      </Link>
<Link to="/signup" className="nav-link" >
        <div>
           <FontAwesomeIcon icon={faUserPlus} className="fa-lg mb-1" />
        </div>
        signup
      </Link>
     {/*  <a href="#" className="my-auto mx-2">
        <i className="fas fa-sign-out-alt fa-2x"></i>
      </a>
      <a href="#" className="my-auto mx-2">
        <i className="fas fa-user fa-2x"></i>
      </a> */}
    </div>

                    </div>
                </nav>
            </div>
        </div>
        <div classname="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div classname="modal-dialog modal-fullscreen">
            <div classname="modal-content rounded-0">
                <div classname="modal-header">
                    <h5 classname="modal-title" id="exampleModalLabel">Search by keyword</h5>
                    <button type="button" classname="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div classname="modal-body d-flex align-items-center">
                    <div classname="input-group w-75 mx-auto d-flex">
                        <input type="search" classname="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1"/>
                        <span id="search-icon-1" classname="input-group-text p-3"><i classname="fa fa-search"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
      )
}

export default HeaderClient