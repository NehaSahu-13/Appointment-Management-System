import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const Sidebar = () => {


  const location=useLocation();
  const loc=window.location.pathname;
  const [active,setActive]=useState(0);


  const navigate = useNavigate();
 
  const toggleSidebar = () => {

  let sidebar=document.querySelector(".sidebar");
  let content=document.querySelector(".content");
  let togglebar=document.querySelector(".togglebar");
  if (sidebar.style.display === "none") {
   sidebar.style.display = "block";
   content.style.marginLeft = "18%";
   togglebar.style.marginLeft = "18%";
    } else {
   sidebar.style.display = "none";
   content.style.marginLeft = "0";
   togglebar.style.marginLeft = "0";
   }
}

useEffect(()=>{

  if(loc==="/doctor/appointments")
    setActive(1);
  else if(loc==="/doctor/timings")
    setActive(2);
  else if(loc==="/doctor/profile")
    setActive(3);
  else if(loc==="/doctor/changePassword")
    setActive(4);
  

},[]);

const logout=()=>{
    localStorage.removeItem('loggedInUser');
     navigate("/");
     window.location.reload();
}

  return (
    <>
      <div className="sidebar"> 
                <span onClick={toggleSidebar} className="crossBtn">X</span>
                <a  href="/doctor/appointments" className={active===1?'user-active':''}><img className="sidebar-img" src="/images/medical-appointment.png"/> Appointments</a>
                <a  href="/doctor/timings" className={active===2?'user-active':''}><img className="sidebar-img" src="/images/chronometer.png"/> Timings</a>
                <a  href="/doctor/profile" className={active===3?'user-active':''}><img className="sidebar-img" src="/images/user.png"/> Profile</a>
                <a  href="/doctor/changePassword" className={active===4?'user-active':''}><img className="sidebar-img" src="/images/security.png"/> Change Password</a>
                <a  href="#" className="item" onClick={logout}><img className="sidebar-img" src="/images/logout.png"/> Logout</a>
                <div className="divider"></div>
      </div>
      <div className="togglebar">
            <i onClick={toggleSidebar} className="fas fa-bars m-3"></i>
       </div>
    </>
  )
}

export default Sidebar
