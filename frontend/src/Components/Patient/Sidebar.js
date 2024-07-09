import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


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

  if(loc==="/patient/appointments")
    setActive(1);
  else if(loc==="/patient/profile")
    setActive(2);
  else if(loc==="/patient/changePassword")
    setActive(3);

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
                <a  href="/patient/appointments" className={active===1?'user-active':''}><img className="sidebar-img" src="/images/appointment.png"/> Appointments</a>
                <a  href="/patient/profile" className={active===2?'user-active':''}><img className="sidebar-img" src="/images/user.png"/> Profile</a>
                <a  href="/patient/changePassword" className={active===3?'user-active':''}><img className="sidebar-img" src="/images/security.png"/> Change Password</a>
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
