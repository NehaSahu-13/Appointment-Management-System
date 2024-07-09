import React, { useEffect, useState } from 'react'
import DoctorService from '../../Services/DoctorService';
import Sidebar from './Sidebar';
import DoctorImageComponent from './DoctorImageComponent';
import { useNavigate } from 'react-router-dom';


const DoctorProfile = () => {
    const [doctor,setDoctor]=useState([]);
    const navigate=useNavigate();

useEffect(()=>{

  const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);   
    const fetchData = async () => {
        try {
          const response = await DoctorService.getDoctorProfile(user.email);
          setDoctor(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
},[]);

const handleEdit=(e,email)=>{
   navigate(`/editDoctor/${email}`);
}

  return (
    <>
      <Sidebar/>
      <div className="content">
              
           <div className='card'>
              <div className='card-body'>
                <div className='text-center'>
                  <DoctorImageComponent filename={doctor.image}/>
                  <div className='mt-4'>{doctor.bio}</div>
                   <button onClick={(e, email) => handleEdit(e, doctor.email)} className='btn btn-success mt-4 mb-2 px-5'>Edit profile</button>
                  <div className='doc-profile'>
                  <div class="row mt-5">
                    <h6 class="col-3">Name</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.name}</div>
                  </div>
                  <div class="row mt-5">
                    <h6 class="col-3">Phone Number</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.phoneNumber}</div>
                  </div>
                  <div class="row mt-5">
                    <h6 class="col-3">Email</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.email}</div>
                  </div>
                  <div class="row mt-5">
                    <h6 class="col-3">Gender</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.gender}</div>
                  </div>
                  <div class="row mt-5">
                    <h6 class="col-3">Qualification</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.qualification}</div>
                  </div>
                  <div class="row mt-5">
                    <h6 class="col-3">Experience</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.experience}</div>
                  </div>
                  <div class="row mt-5">
                    <h6 class="col-3">Specialization</h6>
                    <h6 class="col-2">-</h6>
                    <div class="col" >{doctor.specialization}</div>
                  </div>
                  </div>
                  </div>
              </div>
           </div>

      </div>
    </>
  )
}

export default DoctorProfile
