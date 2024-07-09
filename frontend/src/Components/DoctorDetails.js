import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HomeServices from '../Services/HomeServices';
import { useEffect } from 'react';
import { useState } from 'react';
import DoctorComponent from './DoctorComponent';





const DoctorDetails = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const [doctor,setDoctor]=useState(null);
    const [loading, setLoading] = useState(true);
    const [appointment,setAppointment]=useState({name:"",phoneNumber:"",date:"",time:"",doctorId:id});

useEffect(()=>{
 
    const fetchData = async () => {
      setLoading(true);
        try {
          const response = await HomeServices.getDoctorDetail(id);
          console.log(response.data)
          setDoctor(response.data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();

},[]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setAppointment({...appointment,[name]:value});
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);   
  try {
  
    await HomeServices.bookAppointment(appointment,user.email);
    alert('Appointment added successfully !!');
    window.location.reload();

  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong');
  }
};

const checkUser=(e)=>{
  const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);  
  if(user==null){
    e.preventDefault();
    navigate('/login');
  }
}

  return (
   <>
     <div className='detail-container'>
          {!loading && (
            <div className='d-flex flex-wrap align-items-center justify-content-center'>
                <DoctorComponent doctor={doctor}/>

                <div className='card shadow bg-body rounded p-4 timing-container'>
                    <div className='card-body'>
                      <div className='text-center'>
                          <h4 className='text-primary'>Timings</h4>
                       </div>
                       <div className='mt-5'>
                        {doctor.timings.map((timing) => (
                          <div key={timing.timeId} className='mt-5'>
                             <div className='fw-bold'>{timing.days}  - <span className='ms-5'>{timing.shifts}</span></div>
                             <div className='mt-3'><span>Start Time : {timing.startTime}</span><span className='ms-5'>End Time : {timing.endTime}</span></div>
                          </div>
                        ))}
                        <div className='fw-bold mt-5'>Sunday :- <span className='ms-5'>close</span></div>
                    </div>
 
                    </div>
                    <button className='btn btn-primary book-appointment-btn mt-5' onClick={(e)=>{checkUser(e)}} data-bs-toggle="modal" data-bs-target="#modal">Book An Appointment</button>
                </div>
                
              

            </div>
          )};
          


     
          <div className="modal fade modal-cont" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header mx-3">
                      <h5 className="modal-title head" id="exampleModalLabel">Book An Appointment</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mx-3">
                      <form onSubmit={handleSubmit}>
                       <label for="name" className='form-label'>Patient Name <span style={{color:"red"}}>*</span> </label>
                       <input onChange={(e) => handleChange(e)} required type="text"  name="name" id="name" className='form-control input-bar' placeholder='Enter patient name'/>
                       <label for="phoneNumber" className='form-label mt-3'>Patient Phone Number <span style={{color:"red"}}>*</span> </label>
                       <input onChange={(e) => handleChange(e)} required type="text" name="phoneNumber" id="phoneNumber" className='form-control input-bar' placeholder='Enter phone number'/>
                       <label for="date" className='form-label mt-3'>Appointment Date <span style={{color:"red"}}>*</span> </label>
                       <input onChange={(e) => handleChange(e)} required type="text" name="date" id="date" className='form-control input-bar' />
                       <label for="time" className='form-label mt-3'>Appointment Time<span style={{color:"red"}}>*</span> </label>
                       <input onChange={(e) => handleChange(e)} required type="text"  name="time" id="time" className='form-control input-bar' />
                       <div className='mt-5'>
                            <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success">Book</button>
                       </div>
                       </form>
                    </div>
                     
                  </div>
                </div>
              </div>
         

     </div>
   </>
  )
}

export default DoctorDetails
