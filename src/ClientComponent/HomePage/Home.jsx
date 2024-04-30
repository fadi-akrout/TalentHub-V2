import React from 'react'
import Footer from '../Dashboard/Footer'
import HeaderClient from '../Dashboard/HeaderClient'
import { Link } from 'react-router-dom';

function Home() {
  return (
   <>
 <HeaderClient/>
<div className="container-fluid py-5 mb-5 hero-header">
    <div className="container py-5">
        <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
                <h1 className="mb-5 display-3 text-primary">Welcome to TALENTHUB</h1>
                
               
            </div>
            <div className="col-md-12 col-lg-5">
                <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active rounded">
                            <img src="img/esprit.jpg" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide"/>
                            <a  className="btn px-4 py-2 text-white rounded">Events</a>
                        </div>
                        <div className="carousel-item rounded">
                            <img src="img/jobs.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide"/>
                            <a  className="btn px-4 py-2 text-white rounded">Offers</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
{/* <!-- Hero End -->


<!-- Featurs Section Start --> */}
<div className="container-fluid featurs py-5">
    <div className="container py-5">
        <div className="row g-4">
            <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                    <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                        <i className="fas fa-calendar-alt fa-3x text-white"></i>
                    </div>
                    <div className="featurs-content text-center">
                        <h5>Events</h5>
                        <p className="mb-0"></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                    <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                        <i className="fas fa-user-shield fa-3x text-white"></i>
                    </div>
                    <div className="featurs-content text-center">
                        <h5>Security </h5>
                        <p className="mb-0"></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                    <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                        <i className="fas fa-exchange-alt fa-3x text-white"></i>
                    </div>
                    <div className="featurs-content text-center">
                        <h5>Opportunity exchange</h5>
                        <p className="mb-0"></p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                    <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                        <i className="fa fa-phone-alt fa-3x text-white"></i>
                    </div>
                    <div className="featurs-content text-center">
                        <h5>24/7 Support</h5>
                        <p className="mb-0"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{/* <!-- Featurs Section End -->





<!-- Featurs Start --> */}
<div className="container-fluid service py-5">
    <div className="container py-5">
        <div className="row g-4 justify-content-center">
           
            <div className="col-md-6 col-lg-4">
            <Link to="/signup" >

            <a >
                    <div className="service-item bg-dark rounded border border-dark">
                        <img src="img/Sagemcom.jpg" className="img-fluid rounded-top w-100" alt=""/>
                        <div className="px-4 rounded-bottom">
                            <div className="service-content bg-light text-center p-4 rounded">
                                <h5 className="text-primary">INGENIEUR.E <br/>DEVELOPPEMENT</h5>
                                <h3 className="mb-0"></h3>
                            </div>
                        </div>
                    </div>
                </a>
                </Link>

            </div>  
            <div className="col-md-6 col-lg-4">
            <Link to="/signup" >
            <a >
                    <div className="service-item bg-dark rounded border border-dark">
                        <img src="img/Sagemcom.jpg" className="img-fluid rounded-top w-100" alt=""/>
                        <div className="px-4 rounded-bottom">
                            <div className="service-content bg-light text-center p-4 rounded">
                                <h5 className="text-primary">React Developper</h5>
                                <h3 className="mb-0"></h3>
                            </div>
                        </div>
                    </div>
                    
                </a>
                </Link>
            </div>
            <div className="col-md-6 col-lg-4">
            <Link to="/signup" >

                <a >
                    <div className="service-item bg-dark rounded border border-dark">
                        <img src="img/actia.jpg" className="img-fluid rounded-top w-100" alt=""style={{padding :""}}/>
                        <div className="px-4 rounded-bottom">
                            <div className="service-content bg-light text-center p-4 rounded">
                                <h5 className="text-primary">C++/C# Developper</h5>
                                <h3 className="mb-0"></h3>
                            </div>
                        </div>
                    </div>
                    
                </a>
                </Link>

            </div>
            
          
        </div>
    </div>
</div>
<Footer/>
   </>
  )
}

export default Home