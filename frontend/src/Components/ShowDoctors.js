import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import HomeServices from '../Services/HomeServices';
import { useState } from 'react';
import DoctorComponent from './DoctorComponent';

const ShowDoctors = () => {

    const {id,name}=useParams();
    const [doctors,setDoctors]=useState([]);

useEffect(()=>{
 
    const fetchData = async () => {
        try {
          const response = await HomeServices.getDoctorsByDepartment(id);
          setDoctors(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

},[])
   
  return (
    <>
        <div className='container-department'>
            <div className='text-center'>
               <h3 className='head fw-bold'>{name} Department</h3>
            </div>

            <h3 className='text-primary mt-5'>Our Doctors</h3>
            <div className='d-flex flex-wrap mt-5'>
            {doctors.map((doctor) => (
                <DoctorComponent
                  doctor={doctor}
                  key={doctor.doctorId}></DoctorComponent>
            ))}
            </div>
        </div>
       
    </>
  )
}

export default ShowDoctors
