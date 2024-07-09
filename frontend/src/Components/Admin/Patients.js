import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import AdminService from '../../Services/AdminService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Patients = () => {
    const [patients,setPatients]=useState([]);
    const navigate=useNavigate();

useEffect(()=>{

  const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);   
if (user.role!="Admin") {
   navigate("/defaultPage")
 
}
    const fetchData = async () => {
        try {
          const response = await AdminService.getAllPatients();
          console.log(response)
          setPatients( response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    const deletePatient=  (id)=>{
        try {
             AdminService. deletePatient(id);
            alert('Patient deleted successfully');
              window.location.reload();
        
          } catch (error) {
            console.error('Error:', error);
            alert('Error deleting patient');
          }
    }

  return (
    <>
      <Sidebar/>
      
       <div className="content">
            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>Patients List</h4>
            </div>
            <div className='card mt-5 mx-4 table-card'>
              <div className='card-body'>

              <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Patient Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Age</th>
                                  <th scope="col">Phone</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                
                              {patients.map((patient) => (

                                            <tr key={patient.patientId}>

                                            <th scope="row">{patient.patientId}</th>
                                            <td>{patient.name}</td>
                                            <td>{patient.email}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.phoneNumber}</td>
                                            <div className='action'>
                                                <button className="btn btn-danger" onClick={() => deletePatient(patient.patientId)}>Delete</button>
                                            </div>
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

export default Patients
