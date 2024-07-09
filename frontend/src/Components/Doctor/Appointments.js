import React, { useState } from 'react'
import Sidebar from './Sidebar'
import DoctorService from '../../Services/DoctorService';
import { useEffect } from 'react';


const Appointments = () => {

  const [appointments,setAppointments]=useState([]);

  useEffect(()=>{

    const storedUser = localStorage.getItem('loggedInUser');
    const user=JSON.parse(storedUser);   
      const fetchData = async () => {
          try {
            const response = await DoctorService.getAppointments(user.email);
            setAppointments(response.data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
  },[]);
  
  const handleChange= async (e,id)=>{
    
    e.preventDefault();
    try {
      await DoctorService.changeStatus(e.target.value,id);
       window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      alert('Error updating status');
    }
  }

  return (
    <>
      <Sidebar/>
      <div className="content">
            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>Appointments</h4>
            </div>

            <div className="card mx-4 mt-5 timing-table table-card">
              <div className="card-body">
                <table className="table table-striped mt-5">
                              <thead>
                                <tr>
                                  <th scope="col">Apt.No.</th>
                                  <th scope="col">Apt.Date</th>
                                  <th scope="col">Apt.Time</th>
                                  <th scope="col">Patient Name</th>
                                  <th scope="col">Patient Mobile No.</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {appointments.map((appointment) => (

                                      <tr key={appointment.appointmentId}>
              
                                      <th scope="row">{appointment.appointmentId}</th>
                                      <td>{appointment.aptDate}</td>
                                      <td>{appointment.aptTime}</td>
                                      <td>{appointment.patientName}</td>
                                      <td>{appointment.phoneNumber}</td>
                                      <td>{appointment.status}</td>
                                      <td>
                                          <select onChange={(e) => handleChange(e,appointment.appointmentId)} required name="status" id="status" className="form-control input-bar mb-3">
                                          <option>Change Status</option>
                                          <option value="Booked">Booked</option>
                                          <option value="Cancelled">Cancelled</option>
                                          <option value="Patient Not Available">Patient Not Available</option>
                                          <option value="Completed">Completed</option>
                                          </select>
                                      </td>

                                      </tr>   
                      
                               ))}
                              
                              </tbody>
                    </table>
               </div>
               </div>

      </div>
    </>
  )
}

export default Appointments
