import React from 'react'
import "./style.css";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location=useLocation();
  const loc=window.location.pathname;
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [active,setActive]=useState(0);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }

    if(loc==="/")
      setActive(1);
    else if(loc==="/departments")
      setActive(2);
    else if(loc==="/doctors")
      setActive(3);
    else if(loc==="/admin/dashboard"||loc==="/admin/departments"||loc==="/admin/doctors"||loc==="/admin/patients")
      setActive(4);
    else if (
      loc === "/doctor/appointments" ||
      loc === "/doctor/timings" ||
      loc === "/doctor/profile" ||
      loc === "/patient/changePassword"
  )
      setActive(5);
      else if (
        loc === "/patient/appointments" ||
        loc === "/patient/profile"
    ) 
      setActive(6);
    else if(loc==="/login")
      setActive(7);
    else if(loc==="/register")
      setActive(8);
    else if(loc ==="/patient/changePassword")
      setActive(6);
   
  }, []);

  


  return (
    <div>
         <nav className="navbar  fixed-top navbar-expand-lg nav">
  <div className="container-fluid">
    <div className="mx-5">
    <img src="/images/medicarelogo.png" style={{width:"30px",height:"30px"}}/>
    <a className="navbar-brand mx-2 name" href="#">MediCare</a>
    </div>
    <button className="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" style={{color:"white"}}></span>
    </button>
    <div className="collapse navbar-collapse navbaritems" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a  className={active===1?'active nav-link nav-clr':'nav-link nav-clr'} aria-current="page" href="/">HOME</a>
        </li>
        <li className="nav-item ms-3">
          <a className={active===2?'active nav-link nav-clr':'nav-link nav-clr'} href="/departments">DEPARTMENTS</a>
        </li>
        <li className="nav-item ms-3">
          <a className={active===3?'active nav-link nav-clr':'nav-link nav-clr'} href="/doctors">DOCTORS</a>
        </li>
      
               {loggedInUser ? (
                      <>
                        {loggedInUser.role === "Admin" ? (
                          <li className="nav-item ms-3">
                            <a className={active===4?'active nav-link nav-clr':'nav-link nav-clr'} href="/admin/dashboard">
                              <i className="fa-solid fa-user"></i> {loggedInUser.name}
                            </a>
                          </li>
                        ) : loggedInUser.role === "Doctor" ? (
                          <li className="nav-item ms-3">
                            <a className={active===5?'active nav-link nav-clr':'nav-link nav-clr'} href="/doctor/appointments">
                              <i className="fa-solid fa-user"></i> {loggedInUser.name}
                            </a>
                          </li>
                        ) : (
                          <li className="nav-item ms-3">
                            <a className={active===6?'active nav-link nav-clr':'nav-link nav-clr'} href="/patient/appointments">
                              <i className="fa-solid fa-user"></i> {loggedInUser.name}
                            </a>
                          </li>
                        )}
                      </>
                    ) : (
                      <>
                        <li className="nav-item ms-3">
                          <a className={active===7?'active nav-link nav-clr':'nav-link nav-clr'} href="/login">LOGIN</a>
                        </li>
                        <li className="nav-item ms-3">
                          <a className={active===8?'active nav-link nav-clr':'nav-link nav-clr'} href="/register">REGISTER</a>
                        </li>
                      </>
                    )}
      </ul>
    </div>
  </div>
</nav>
<Outlet />
    </div>
  )
}

export default Navbar
