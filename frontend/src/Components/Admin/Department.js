import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useEffect } from 'react';
import AdminService from '../../Services/AdminService';
import ImageComponent from './ImageComponent';
import { useNavigate } from 'react-router-dom';

const Department = () => {

  const navigate=useNavigate();
  const [departments,setDepartments]=useState([]);
  const [newDepartment, setNewDepartment] = useState({name:"",image:null});
  const [updateDep,setUpdateDep]=useState({name:"",id:"",image:null});
   
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewDepartment({ ...newDepartment, image: files[0] });
    } else {
      setNewDepartment({ ...newDepartment, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminService.addDepartment(newDepartment.name, newDepartment.image);
      alert('Department added successfully');
      setNewDepartment({name: "",
        image:null});
        window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      alert('Error adding department');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user=JSON.parse(storedUser);   
if (user.role!="Admin") {
     navigate("/defaultPage")
   
}
    const fetchData = async () => {
      try {
        const response = await AdminService.getAllDepartments();
        console.log(response)
        setDepartments( response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

 const updateform=(id,depname)=>{
    setUpdateDep({name:depname,id:id});
 }

 const handleChangeUpdate =(e) => {
  const { name, value, files } = e.target;
  if (name === 'image') {
    setUpdateDep({ ...updateDep, image: files[0] });
  } else {
    setUpdateDep({ ...updateDep, [name]: value });
  }
};

const handleUpdate= async (e) => {
   e.preventDefault();
   
  try {
    await AdminService.updateDepartment(updateDep.name, updateDep.image,updateDep.id);
    alert('Department updated successfully');
      window.location.reload();

  } catch (error) {
    console.error('Error:', error);
    alert('Error updating department');
  }
};

const deleteDepartment=async(id)=>{
  try {
    await AdminService.deleteDepartment(id);
    alert('Department deleted successfully');
      window.location.reload();

  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting department');
  }
}

  return (
    <>
       
       <Sidebar/>
       <div className="content">
            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>Departments List</h4>
            </div>
            <div className='card mt-5 mx-4 table-card'>
              <div className='card-body'>

              <div className='text-center my-4'>
                 <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Department</button>
                </div>
              <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Department Name</th>
                                  <th scope="col">Image</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {departments.map((dep) => (

                                      <tr key={dep.id}>
              
                                      <th scope="row">{dep.deptId}</th>
                                      <td>{dep.name}</td>
                                      <td > 
                                              <ImageComponent filename={dep.image}/>
                                      </td>
                                      <td className='d-flex flex-wrap gap-2 action'>
                                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#updateexampleModal" onClick={() => updateform(dep.deptId,dep.name)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => deleteDepartment(dep.deptId)}>Delete</button>

                                      </td>

                                      </tr>   
                      
                               ))}
                              
                              </tbody>
                    </table>




                
              </div>
           </div>


          

              <div className="modal fade modal-cont" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header mx-3">
                      <h5 className="modal-title head" id="exampleModalLabel">Add Department</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mx-3">
                       <label for="name" className='form-label'>Department Name <span style={{color:"red"}}>*</span> </label>
                       <input onChange={(e) => handleChange(e)} required type="text" value={newDepartment.name} name="name" id="name" className='form-control input-bar' placeholder='Enter Department name'/>
                       <label for="image" className='form-label mt-4'>Choose Image <span style={{color:"red"}}>*</span>  </label>
                       <input onChange={(e) => handleChange(e)} required type="file" name="image" id="image"/>
                    </div>
                    <div className="modal-footer mt-2">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      <button onClick={handleSubmit} type="button" className="btn btn-success">ADD</button>
                    </div>
                  </div>
                </div>
              </div>
         



         {/* update */}
         <div className="modal fade modal-cont" id="updateexampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header mx-3">
                      <h5 className="modal-title head" id="exampleModalLabel">Edit Department</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mx-3">
                       <label for="name" className='form-label'>Department Name : </label>
                       <input onChange={(e) => handleChangeUpdate(e)} required type="text" value={updateDep.name} name="name" id="name" className='form-control input-bar' placeholder='Enter Department name'/>
                       <label for="image" className='form-label mt-4'>Change Image : </label>
                       <input onChange={(e) => handleChangeUpdate(e)} required type="file" name="image" id="image"/>
                    </div>
                    <div className="modal-footer mt-2">
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      <button onClick={handleUpdate} type="button" className="btn btn-success">Update</button>
                    </div>
                  </div>
                </div>
              </div>
         

       </div>

    </>
  )
}

export default Department
