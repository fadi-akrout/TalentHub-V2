import React from 'react'
import '../../../public/css/style.css'
function Header() {
  return (
    <>
   
    <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
            <div className="d-flex justify-content-between">
                <div className="top-info ps-2">
                    <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#" className="text-white">123 Street, New York</a></small>
                    <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><a href="#" className="text-white">Email@Example.com</a></small>
                </div>
                <div className="top-link pe-2">
                    <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                    <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                    <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                </div>
            </div>
        </div>
        <div className="container px-0">
            <nav className="navbar navbar-light bg-white navbar-expand-md">
                <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
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
                        <a href="contact.html" className="nav-item nav-link">Contact</a>
                    </div>
                    <div className="d-flex m-3 me-0">
  <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal">
    <i className="fas fa-search text-primary"></i>
  </button>
 {/*  <a href="#" className="position-relative me-4 my-auto">
    <i className="fa fa-shopping-bag fa-2x"></i>
    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{top: "-5px", left: "15px", height: "20px", minWidth: "20px"}}>3</span>
  </a> */}
  <a href="/login" className="my-auto mx-2">
    <i className="fas fa-sign-in-alt fa-2x"></i>
  </a>
  <a href="/signup" className="my-auto mx-2">
    <i className="fas fa-user-plus fa-2x"></i>
  </a>
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

export default Header