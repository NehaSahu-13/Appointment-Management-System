import React, { useState } from 'react'
import Sidebar from './Sidebar'
import DoctorService from '../../Services/DoctorService';
import { useEffect } from 'react';


const Timings = () => {
    const [timings,setTimings]=useState([]);
    const [newTiming,setNewTiming]=useState({days:"",shifts:"",startTime:"",endTime:""});
    const [updateTiming,setUpdateTiming] = useState({days:"",shifts:"",startTime:"",endTime:"",timeId:0});

const handleChange = (e) => {
        const value = e.target.value;
        setNewTiming({ ...newTiming, [e.target.name]: value });
};

const handleUpdateChange = (e) => {
    const value = e.target.value;
    setUpdateTiming({ ...updateTiming, [e.target.name]: value });
};

const handleUpdateform=(id,days,shifts,startTime,endTime)=>{
     setUpdateTiming({days:days,shifts:shifts,startTime:startTime,endTime:endTime,timeId:id});
}

const handleDelete = async (id)=>{
    
  try {
    
    await DoctorService.deleteTiming(id);
    alert('Timing deleted successfully');
    window.location.reload();

  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting timing ');
  }
};

useEffect(()=>{

    const storedUser = localStorage.getItem('loggedInUser');
    const user=JSON.parse(storedUser);   
      const fetchData = async () => {
          try {
            const response = await DoctorService.getTimings(user.email);
            setTimings(response.data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
  },[]);

const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('loggedInUser');
    const user=JSON.parse(storedUser);   
    try {
    
      await DoctorService.addTiming(newTiming,user.email);
      alert('Timing added successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error:', error);
      alert('Error adding timing ');
    }
  };

  const handleUpdateSubmit= async () => {

    
   try {
     await DoctorService.updateTiming(updateTiming);
     alert('Timing updated successfully');
       window.location.reload();
 
   } catch (error) {
     console.error('Error:', error);
     alert('Error updating timing');
   }

 };
 

  return (
    <>
        <Sidebar/>
        <div className='content'>
            <div className='card text-center mx-5 shadow  bg-body rounded'>
              <h4 className='card-body head'>Timings</h4>
            </div>
            <div className="card mx-4 mt-5 pb-4">
            <div className="card-body">
                <h4 className="text-primary">Add Timing</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label for="days">Days</label>
                            <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="days" name='days'/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="shifts">Shift</label>
                            <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="shifts" name='shifts'/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="startTime">Start Time</label>
                            <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="startTime" name="startTime"/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="endTime">End Time</label>
                            <input type="text" required onChange={(e) => handleChange(e)} className="form-control input-bar" id="endTime" name="endTime"/>
                        </div>
                        <div className="form-group col-md-2 align-self-end">
                            <button type="submit" className="btn btn-primary px-5 timing-btn">ADD</button>
                        </div>
                    </div>
                </form>
                </div>
                </div>

            <div className="card mx-4 mt-5 timing-table table-card">
              <div className="card-body">
                <table className="table table-striped mt-5">
                              <thead>
                                <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Days</th>
                                  <th scope="col">Shifts</th>
                                  <th scope="col">Start Time</th>
                                  <th scope="col">End time</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {timings.map((time) => (

                                      <tr key={time.timeId}>
              
                                      <th scope="row">{time.timeId}</th>
                                      <td>{time.days}</td>
                                      <td>{time.shifts}</td>
                                      <td>{time.startTime}</td>
                                      <td>{time.endTime}</td>
                                     
                                      <td className='d-flex flex-wrap gap-2 action'>
                                        <button className='btn btn-success' onClick={()=>{handleUpdateform(time.timeId,time.days,time.shifts,time.startTime,time.endTime)}} data-bs-toggle="modal" data-bs-target="#updateexampleModal">Edit</button>
                                        <button className='btn btn-danger' onClick={()=>{handleDelete(time.timeId)}}>Delete</button>

                                      </td>

                                      </tr>   
                      
                               ))}
                              
                              </tbody>
                    </table>
               </div>
               </div>

            </div>

            <div className="modal fade modal-cont" id="updateexampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header mx-3">
                      <h5 className="modal-title head" id="exampleModalLabel">Edit Timing</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body mx-3 mb-5">
                    <form onSubmit={handleUpdateSubmit}>
                    <div className="row">
                      
                        <div className="form-group col-md-2">
                          
                            <label for="days">Days</label>
                            <input type="text" required onChange={(e) => handleUpdateChange(e)} className="form-control input-bar" value={updateTiming.days} id="days" name='days'/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="shifts">Shift</label>
                            <input type="text" required onChange={(e) => handleUpdateChange(e)} className="form-control input-bar" value={updateTiming.shifts} id="shifts" name='shifts'/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="startTime">Start Time</label>
                            <input type="text" required onChange={(e) => handleUpdateChange(e)} className="form-control input-bar" value={updateTiming.startTime} id="startTime" name="startTime"/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="endTime">End Time</label>
                            <input type="text" required onChange={(e) => handleUpdateChange(e)} className="form-control input-bar" value={updateTiming.endTime} id="endTime" name="endTime"/>
                        </div>
                        <div className="form-group col-md-2 align-self-end">
                            <button type="submit" className="btn btn-primary px-5 timing-btn">Update</button>
                        </div>
                     
                      </div>
                      </form>
                    </div>
                    
                  </div>
                
         
      
            </div>
        </div>
   </>
  )
}

export default Timings
