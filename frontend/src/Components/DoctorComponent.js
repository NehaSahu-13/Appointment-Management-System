import React from 'react'
import HomeImageComponent from './HomeImageComponent'
import { useNavigate } from 'react-router-dom'

const DoctorComponent = ({doctor}) => {
    const navigate=useNavigate();

    const DoctorDetail=(id)=>{
       navigate(`/doctorDetails/${id}`);
    }
  return (
    <>
        <a className='card me-5 shadow bg-body rounded mb-5 home-card' role="button" onClick={()=>{DoctorDetail(doctor.doctorId)}} >
            <div className='card-body'>
                <div>
                    <HomeImageComponent filename={doctor.image}/>
                </div>
                <hr/>
                <div>
                  <div className='text-center'>
                              <h5>{doctor.name}</h5>
                   </div>
                   <div className='ms-3 mb-3'>
                      <div className='mt-3'><span className='fw-bold'>Qualification : </span> {doctor.qualification}</div>
                      <div className='mt-2'><span className='fw-bold'>Specialization : </span> {doctor.specialization}</div>
                   </div>
                  </div>
            </div>
        </a>
    </>
  )
}

export default DoctorComponent
