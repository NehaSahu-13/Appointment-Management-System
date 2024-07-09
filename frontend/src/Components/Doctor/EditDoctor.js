import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import DoctorService from '../../Services/DoctorService';
import Sidebar from './Sidebar';



const EditDoctor = () => {
    const {email}=useParams();
    const [updateDoctor,setUpdateDoctor]=useState({name:"",email:"",phoneNumber:"",gender:"Male",password:"",experience:"",qualification:"",specialization:"",bio:"",department:0});
    const [image,setImage]=useState(null);
    const navigate=useNavigate();

useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await DoctorService.getDoctorProfile(email);
          setUpdateDoctor(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
},[]);

const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImage(files[0]);
    } else {
        setUpdateDoctor({ ...updateDoctor, [name]: value });
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await DoctorService.updateDoctor(updateDoctor,image);
      alert('Your profile updated successfully');
      
       navigate("/doctor/profile");

    } catch (error) {
      console.error('Error:', error);
      alert('Error updating profile');
    }
  };


  return (
    <>
    <Sidebar/>
     <div className='content'>
     <div className="card container-adddoctor shadow bg-body p-3 rounded">
                    <div className='card-body'>

                       <div className='d-flex align-items-baseline justify-content-center'>
                        <span className='fs-3 ms-2 mb-4'>Update Profile</span>
                      </div>
                      <form onSubmit={handleSubmit}>
                           <div className="mb-3">
                                <label for="name" className="form-label">Doctor Name </label>
                                <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="name" value={updateDoctor.name} name="name"/>
                            </div>
                             
                            <div className="mb-3">
                                <label for="mobile" class="form-label">Phone Number</label>
                                <input type="number" pattern="[0-9]{10}" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="mobile" value={updateDoctor.phoneNumber} name="phoneNumber"   />    
                            </div>

                            <label for="gender" className="form-label">Gender</label>
                            <select  name="gender" required onChange={(e) => handleChange(e)} id="gender" value={updateDoctor.gender} className="form-control input-bar mb-3">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <div className="mb-3">
                                <label for="experience" className="form-label">Experience</label>
                                <input type="text" required  onChange={(e) => handleChange(e)} className="form-control input-bar" id="experience" value={updateDoctor.experience} name="experience"/>
                            </div>
                            
                            <div className="mb-3">
                                <label for="qualification" onChange={(e) => handleChange(e)} className="form-label">Qualification</label>
                                <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="qualificaton" value={updateDoctor.qualification}  name="qualification"/>
                            </div>

                            <div className="mb-3">
                                <label for="specialization"className="form-label">Specialization</label>
                                <textarea required onChange={(e) => handleChange(e)} className="form-control input-bar" id="specialization" value={updateDoctor.specialization} name="specialization"/>
                            </div>

                            <div className="mb-3">
                                <label for="bio" className="form-label">Bio</label>
                                <textarea required onChange={(e) => handleChange(e)} className="form-control input-bar" id="bio" value={updateDoctor.bio} name="bio"/>
                            </div>

                            <div className="custom-file my-4">
                                <label for="image" className="form-label">Change Image : </label>
                                <input type="file" onChange={(e) => handleChange(e)} name="image" id="image"/>
                            </div>
                                                    
                           
                            
                          

                        <div className='text-center my-5'> 
                           <button className='btn btn-danger px-5 btn-back' onClick={() => navigate("/doctor/profile")}>Back</button>
                           <button className='btn btn-success px-5 ms-2' type="submit">Edit</button>
                       </div>
                      </form>
                    </div>
                </div>
     </div>
    </>
  )
}

export default EditDoctor
