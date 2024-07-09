import React, { useState } from 'react'
import Sidebar from './Sidebar'
import PatientService from '../../Services/PatientService';


const PatientChangePassword = () => {
    const [password,setPassword]=useState({currpassword:"",newpassword:"",confirmpassword:""});
    
const handleChange = (e) => {
        const value = e.target.value;
        setPassword({ ...password, [e.target.name]: value });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);   
    try {
    
       await PatientService.changePassword(password,user.email);
      alert('Your password changed successfully');
      window.location.reload();

       
    } catch (error) {
      console.error('Error:', error);
      alert('Password not matched');
         
    }
  };


  return (
    <>
     <Sidebar/>
       <div className='content'>
        <div className='card changepass-container shadow bg-body p-3 rounded'>
         <div className='card-body'>
            <div className='text-center'>
           <h3 className='head'>Change Password</h3>
           </div>
           <form className='mt-4' onSubmit={(e)=>handleSubmit(e)}>
           <div class="mb-3">
                <label for="currpassword" class="form-label">Current Password :</label>
                <input type="password" required onChange={(e) => handleChange(e)} class="form-control input-bar" id="exampleInputPassword1" name="currpassword"/>
            </div>
            <div class="mb-3">
                <label for="newpassword" class="form-label">New Password :</label>
                <input type="password" required onChange={(e) => handleChange(e)} class="form-control input-bar" id="exampleInputPassword1" name="newpassword"/>
            </div>
            <div class="mb-3">
                <label for="confirmpassword" class="form-label">Confirm New Password :</label>
                <input type="password" required onChange={(e) => handleChange(e)} class="form-control input-bar" id="exampleInputPassword1" name="confirmpassword"/>
            </div>
            <button className='btn btn-success mt-4' type="submit">Change Password</button>
           </form>
           </div>
        </div>

       </div>
    </>
  )
}

export default PatientChangePassword
