import React from 'react'
import Contactus from './Contactus';
import { useEffect } from 'react';

const Home = () => {

  useEffect(()=>{
    const isFirstVisit = sessionStorage.getItem('isFirstVisit');
    
    if (!isFirstVisit) {
      localStorage.removeItem('loggedInUser');
      sessionStorage.setItem('isFirstVisit', 'true');
    }
   
  },[]);
  
  return (
    <>
     <div className="home-container">
      <div className="about-sec">
          <div className="about">Welcome to our Doctor's Appointment Management System! Our platform is designed to streamline the process of booking and managing medical appointments for patients and healthcare providers alike.</div>
          <div className="about mt-3 dis-hide">Our mission is to provide an efficient, user-friendly interface that helps patients easily find and book appointments with doctors across various specialties. We aim to enhance the healthcare experience by reducing wait times and ensuring timely, organized medical consultations.</div>
      </div>
      <img src="images/doctors-img.jpg" className="homedoctors-img"/>
     </div>
     <Contactus/>
     <footer className="footer mt-5">
      <div className='footer-content'>
      <div className='row'>
        <div class="mt-3 col-9">
            <h4>About us</h4>
            <p>Our platform is designed to streamline the process of booking and managing medical appointments for patients and healthcare providers of our Medicare Hospital.</p>
        </div>
        <div class="mt-3 col">
            <h4>Call us</h4>
            <p><i className="fa-solid fa-phone"></i> Phone: 6263696830</p>
         </div>
      </div>
      </div>
      <div className="mt-3">
                    <div className="text-center">
                         <p>Address : Krishak Nagar , Jora , Raipur (C.G.)</p>
                        <p>Copyright &copy;2024 Medicare hospital's doctor Appointment Management System. All rights reserved.</p>
                    </div>
      </div>

     </footer>
   </>
  )
}

export default Home;
