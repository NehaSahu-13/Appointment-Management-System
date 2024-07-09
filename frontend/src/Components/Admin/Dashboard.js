import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import AdminService from '../../Services/AdminService';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

const navigate=useNavigate();
const [totalDepartments,setTotaldepartments]=useState(0);
const [totalDoctor,setTotalDoctor]=useState(0);
const [totalPatient,setTotalPatient]=useState(0);
const [totalAppointment,setTotalAppointment]=useState(0);

useEffect(() => {
  const storedUser = localStorage.getItem('loggedInUser');
      const user=JSON.parse(storedUser);   
  if (user.role!="Admin") {
       navigate("/defaultPage")
     
  }
    const fetchData = async () => {
      try {
        const response1 = await AdminService.getCountOfDepartments();
         setTotaldepartments(response1.data);
        const response2 =await AdminService.getCountOfDoctors();
        setTotalDoctor(response2.data);
        const response3 = await AdminService.getCountOfPatients();
        setTotalPatient(response3.data);
        const response4 = await AdminService.getCountOfAppointments();
        setTotalAppointment(response4.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <Sidebar/>
      <div className="content">
            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>Admin Dashboard</h4>
            </div>
            <div className='d-flex mt-5 flex-wrap gap-5'>
                <div className='card text-center mx-5 shadow  bg-body rounded'>
                  <div className='card-body text-primary'><h5>Total Departments<img className="sidebar-img ms-4" src="/images/department.png"/> </h5>
                  <h5>{totalDepartments}</h5>
                  </div>
                </div>
                <div className='card text-center mx-5 shadow  bg-body rounded'>
                  <div className='card-body text-primary'><h5>Total Doctors <img className="sidebar-img ms-4" src="/images/doctor.png"/></h5>
                  <h5>{totalDoctor}</h5>
                  </div>
                </div>
                <div className='card text-center mx-5 shadow  bg-body rounded'>
                  <div className='card-body text-primary'><h5>Total Patients <img className="sidebar-img ms-4" src="/images/crowd.png"/></h5>
                  <h5>{totalPatient}</h5>
                  </div>
                </div>
                <div className='card text-center mx-5 shadow  bg-body rounded'>
                  <div className='card-body text-primary'><h5>Total Appointments <img className="sidebar-img ms-4" src="/images/medical-appointment.png"/></h5>
                  <h5>{totalAppointment}</h5>
                  </div>
                </div>
            </div>
       </div>
    </>
  )
}

export default Dashboard
