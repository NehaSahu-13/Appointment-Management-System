import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useEffect } from 'react'
import AdminService from '../../Services/AdminService'
import ImageComponent from './ImageComponent'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {

    const [doctors,setDoctors]=useState([]);
    const navigate = useNavigate();


useEffect(() => {

  const storedUser = localStorage.getItem('loggedInUser');
  const user=JSON.parse(storedUser);   
if (user.role!="Admin") {
   navigate("/defaultPage")
 
}
  
        const fetchData = async () => {
          try {
            const response = await AdminService.getAllDoctors();
            console.log(response)
            setDoctors(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
}, []);

const deleteDoctor= async (id)=>{

  try {
    
    await AdminService.deleteDoctor(id);
    alert('Doctor deleted successfully');
     window.location.reload();

  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting doctor');
  }
}

  return (
    <>
      <Sidebar/>
       <div className="content">
            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>Doctors List</h4>
            </div>
      
            <div className='card mt-5 mx-4 table-card'>
               <div className='card-body'>

                    <div className='text-center my-4'>
                    <button className='btn btn-primary'  onClick={() => navigate("/addDoctor")}>Add Doctor</button>
                    </div>
                    <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Image</th>
                                  <th scope="col">Doctor Name</th>
                                  <th scope="col">Department</th>
                                  <th scope="col">Phone</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                             
                              {doctors.map((doc) => (
                                     
                                    <tr key={doc.doctorId}>

                                    <th scope="row">{doc.doctorId}</th>
                                    <td > 
                                            <ImageComponent filename={doc.image}/>
                                    </td>
                                    <td>{doc.name}</td>
                                     <td>{doc.department}</td>
                                    <td>{doc.phoneNumber}</td>
                                    <div className='action'>
                                    <button className="btn btn-danger" onClick={() => deleteDoctor(doc.doctorId)}>Delete</button>
                                    </div>
                                    </tr>   

                                    ))}

                                
                              </tbody>
                    </table>
        
               </div>
             </div>


        </div>
    </>
  )
}

export default Doctors
