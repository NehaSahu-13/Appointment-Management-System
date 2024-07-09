import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeServices from '../Services/HomeServices';
const Register = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
    email:""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const register = () => {
    
    HomeServices.registerPatient(user)
       .then((response) => {
        
          alert("Registered Successfully !!");
           setUser({name: "",
             password: "",
             email:""});
            navigate("/");
       })
       .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert('Email already exists !!'); 
        } else {
          alert("Something went wrong !!");
        }
        
       });
   };

  return (
    <>
      <div className='base'>  </div>
      <div className="row mt-5 content-container">
        <div className="col card">
          <div className='card-body'>
             <form onSubmit={register}>
                <div className="text-center fs-3 fw-bolder login-circle">SignUp</div>
                  <div className="mb-3 mt-3">
                      <label for="userName" className="form-label">Name:</label>
                      <input required type="text" onChange={(e) => handleChange(e)} className="form-control input-bar" id="username" name="name" placeholder="Enter username"/>
                    </div> 
                    <div className="mb-3">
                      <label for="email" className="form-label">Email:</label>
                      <input required type="text" onChange={(e) => handleChange(e)} className="form-control input-bar" id="" name="email" placeholder="Enter email"/>
                    </div> 
                    <div class="mb-5">
                      <label for="password" className="form-label">Password:</label>
                      <input required type="password" onChange={(e) => handleChange(e)} className="form-control input-bar" id="password" name="password" placeholder="Enter password"/>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-primary ps-5 pe-5">Sign Up</button>
                    </div>
              </form>
            </div>
        </div>
        <div className='col-6'>
           <img src="/images/doctor2.jpg" alt="Doctor-Image" className='baseimg'/>
        </div>
      </div>
    </>
  )
}

export default Register
