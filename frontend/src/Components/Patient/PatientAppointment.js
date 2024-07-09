import React from 'react'
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { useState } from 'react';
import PatientService from '../../Services/PatientService';


const PatientAppointment = () => {
  const [appointments,setAppointments]=useState([]);

  useEffect(()=>{

    const storedUser = localStorage.getItem('loggedInUser');
    const user=JSON.parse(storedUser);   
      const fetchData = async () => {
          try {
            const response = await PatientService.getAppointments(user.email);
            console.log(response.data)
            setAppointments(response.data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
  },[]);
  
  

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
                                  <th scope="col">Doctor Name</th>
                                  <th scope="col">Doctor Department</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                              {appointments.map((appointment) => (

                                      <tr key={appointment.appointmentId}>
              
                                      <th scope="row">{appointment.appointmentId}</th>
                                      <td>{appointment.aptDate}</td>
                                      <td>{appointment.aptTime}</td>
                                      <td>{appointment.doctorName}</td>
                                      <td>{appointment.department}</td>
                                      <td>{appointment.status}</td>

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

export default PatientAppointment
