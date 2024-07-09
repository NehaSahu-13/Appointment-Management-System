import React from 'react';
import { useState } from 'react';
import HomeServices from "../Services/HomeServices"
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [user, setUser] = useState({
    userName: "",
    password: "",
    role:"Patient"
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const loginUser = (e) => {
    
   HomeServices.login(user)
      .then((response) => {
       
           alert("Login Successfull !!");
           localStorage.setItem('loggedInUser', JSON.stringify({ name:response.data, role: user.role ,email:user.userName}));
          setUser({name: "",
            password: "",
            role:"Patient"});
            window.location.reload();
      })
      .catch((error) => {
        alert("Invalid Credentials !!");
      });
  };

  return (
    <>
      <div className='base'>  </div>
      <div className="row mt-5 content-container">
        <div className="col card">
          <div className='card-body'>
                <div className="text-center fs-3 fw-bolder login-circle">Login</div>
                  <div className="mb-3 mt-3">
                      <label for="userName" className="form-label">Username:</label>
                      <input required value={user.userName} onChange={(e) => handleChange(e)} type="text" className="form-control input-bar" id="userName" name="userName" placeholder="Enter username"/>
                    </div> 
                    <div class="mb-3">
                      <label for="password" className="form-label">Password:</label>
                      <input required value={user.password} onChange={(e) => handleChange(e)} type="password" className="form-control input-bar" id="password" name="password" placeholder="Enter password"/>
                    </div>
                    <label>Select Role:</label>
                    <select class="form-select mb-5 input-bar" name="role" onChange={(e) => handleChange(e)} aria-label="Default select example">
                          <option value="Patient" Selected>Patient</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Admin">Admin</option>
                    </select>
                    <div className="text-center">
                    <button  onClick={loginUser} className="btn btn-primary ps-5 pe-5">Login</button>
                    </div>
                    <div className="text-center my-3">
                         Don't have an account ?
                        <a href="/register">Sign Up</a>
                  </div>
            </div>
        </div>
        <div className='col-6'>
           <img src="/images/doctor2.jpg" alt="Doctor-Image" className='baseimg'/>
        </div>
      </div>
    
    </>
  )
}

export default Login
