import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminService from '../../Services/AdminService';
import Sidebar from './Sidebar';



const AddDoctor = () => {
    const [departments,setDepartments]=useState([]);
    const [doctor,setDoctor]=useState({name:"",email:"",phoneNumber:"",gender:"Male",password:"",experience:"",qualification:"",specialization:"",bio:"",department:0});
    const [image,setImage]=useState(null);
    const navigate = useNavigate();


 useEffect(() => {
  const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);   
if (user.role!="Admin") {
   navigate("/defaultPage")
 
}
        const fetchData = async () => {
          try {
            const response = await AdminService.getAllDepartments();
            console.log("res ", response);

            let parsedData = [];
            if (typeof response.data === 'string') {
                parsedData = JSON.parse(response.data);
            } else {
                parsedData = response.data;
            }

            console.log("parsed departments: ", parsedData);
            setDepartments(parsedData);
            
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
        
 }, []);

 const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setImage(files[0]);
    } else {
      setDoctor({ ...doctor, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      await AdminService.addDoctor(doctor,image);
      alert('Doctor added successfully');
       navigate("/admin/doctors");
       window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      alert('Error adding doctor');
    }
  };

  useEffect(() => {
    console.log("Updated departments:", departments);
  }, [departments]);


  return (
    <>
         <Sidebar/>
         <div className='content'>
                <div className="card container-adddoctor shadow bg-body p-3 rounded">
                    <div className='card-body'>

                       <div className='d-flex align-items-baseline justify-content-center'>
                        <img src="/images/plus.png" className='sidebar-img'/>
                        <span className='fs-3 ms-2'>Add Doctor</span>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <label for="department" className="form-label mt-5">Select Department  <span className="text-danger">*</span></label>
                        <select required  onChange={(e) => handleChange(e)} name="department" id="department" className="form-control input-bar mb-3">
                          <option>Choose Department</option>
                          {Array.isArray(departments) && departments.map((dep) => (
                              <option key={dep.deptId} value={dep.deptId}>{dep.name}</option>
                            ))};
                        </select>
                           <div className="mb-3">
                                <label for="name" className="form-label">Doctor Name <span className="text-danger">*</span> </label>
                                <input required type="text" onChange={(e) => handleChange(e)} className="form-control input-bar" id="name" placeholder="Enter name" name="name"/>
                            </div>
                             
                            <div className="mb-3">
                                <label for="mobile" class="form-label">Phone Number<span className="text-danger">*</span></label>
                                <input type="number" onChange={(e) => handleChange(e)} required className="form-control input-bar" id="mobile" placeholder="Enter Mobile" name="phoneNumber"  pattern="[0-9]{10}" />    
                            </div>

                            <div className='mb-3'>
                                <label for="exampleInputEmail1" className="form-label">Email<span class="text-danger">*</span></label>
                                <input type="email" onChange={(e) => handleChange(e)} required className="form-control input-bar" id="exampleInputEmail1" placeholder="Enter Email" name="email"/>
                            </div>

                            <div className='mb-3'>
                                <label for="password" className="form-label">Password<span class="text-danger">*</span></label>
                                <input type="password" onChange={(e) => handleChange(e)} required className="form-control input-bar" id="password" placeholder="Enter password" name="password"/>
                            </div>

                            <label for="gender" className="form-label">Gender<span className="text-danger">*</span></label>
                            <select required name="gender" onChange={(e) => handleChange(e)} id="gender" className="form-control input-bar mb-3">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <div className="mb-3">
                                <label for="experience" className="form-label">Experience<span className="text-danger">*</span>  </label>
                                <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="experience"  name="experience"/>
                            </div>
                            
                            <div className="mb-3">
                                <label for="qualification" onChange={(e) => handleChange(e)} className="form-label">Qualification<span className="text-danger">*</span>  </label>
                                <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="qualificaton"  name="qualification"/>
                            </div>

                            <div className="mb-3">
                                <label for="specialization"className="form-label">Specialization<span className="text-danger">*</span>  </label>
                                <textarea required onChange={(e) => handleChange(e)} className="form-control input-bar" id="specialization"  name="specialization"/>
                            </div>

                            <div className="mb-3">
                                <label for="bio" className="form-label">Bio<span class="text-danger">*</span>  </label>
                                <textarea required  onChange={(e) => handleChange(e)} className="form-control input-bar" id="bio"  name="bio"/>
                            </div>

                            <div className="custom-file my-4">
                                <label for="image" className="form-label">Add Doctor's Image <span className="text-danger">*</span>  </label>
                                <input type="file" onChange={(e) => handleChange(e)} required name="image" id="image"/>
                            </div>
                                                    
                           
                            
                          

                        <div className='text-center my-5'> 
                           <button className='btn btn-danger px-5 btn-back' onClick={() => navigate("/admin/doctors")}>Back</button>
                           <button className='btn btn-success px-5 ms-2'>Add</button>
                       </div>
                      </form>
                    </div>
                </div>
         </div>
    </>
  )
}

export default AddDoctor
