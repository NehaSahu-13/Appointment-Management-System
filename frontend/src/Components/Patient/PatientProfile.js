import React, { useState } from 'react'
import Sidebar from './Sidebar'
import PatientService from '../../Services/PatientService';
import { useEffect } from 'react';



const PatientProfile = () => {

    const [patient,setPatient]=useState(null);
    const [loading, setLoading] = useState(true);

useEffect(()=>{

        const storedUser = localStorage.getItem('loggedInUser');
        const user=JSON.parse(storedUser);   
          const fetchData = async () => {
            setLoading(true);
              try {
                const response = await PatientService.getPatientProfile(user.email);
                console.log(response.data)
                setPatient(response.data);
              } catch (error) {
                console.log(error);
              }
              setLoading(false);
            };
            fetchData();
 },[]);


 const handleChange = (e) => {
    const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(patient)
      await PatientService.updatePatient(patient);
      alert('Your profile updated successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      alert('Error updating profile');
    }
  };



  return (
    <>
       <Sidebar/>
       <div className='content'>

            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>My Profile</h4>
            </div>
            
            {!loading && ( <div className='card shadow-sm bg-body rounded mt-5 mx-3 p-5'>
                        <div className='card-body'>
                          <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                        <label for="name" className="form-label">Name </label>
                                        <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="name" value={patient.name} name="name"/>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label for="mobile" class="form-label">Phone Number</label>
                                        <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="mobile" value={patient.phoneNumber} name="phoneNumber"  pattern="[0-9]{10}" />    
                                    </div>

                                    <label for="gender" className="form-label">Gender</label>
                                    <select  name="gender" required onChange={(e) => handleChange(e)} id="gender" value={patient.gender} className="form-control input-bar mb-3">
                                        <option>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>

                                    <div className="mb-5">
                                        <label for="age" className="form-label">Age</label>
                                        <input type="number" required  onChange={(e) => handleChange(e)} className="form-control input-bar" id="age" value={patient.age} name="age"/>
                                    </div>                                 
                                
                                <button className='btn btn-success px-5 ms-2' type="submit">Submit</button>
                                </form>
                        </div>
                </div>
             )};
 

        </div>
           
    </>
  )
}

export default PatientProfile
