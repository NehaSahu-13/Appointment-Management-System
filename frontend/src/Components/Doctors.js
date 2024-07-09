import React, { useState, useEffect } from 'react';
import HomeServices from '../Services/HomeServices';
import HomeImageComponent from './HomeImageComponent';
import { useNavigate } from 'react-router-dom';
import DoctorComponent from './DoctorComponent';


const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await HomeServices.getAllDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await HomeServices.searchDoctor(searchTerm);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error searching departments', error);
    }
  };

 

  return (
    <>
    <div className='base'>  </div>
    <div>  
      <div className='text-center my-5'>
      <h3 className='head'>Doctors</h3>
      </div>
      <div className="d-flex search-box">
       <input className="form-control me-2 input-bar" type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for Department" aria-label="Search"/>
       <button className="btn btn-primary px-4" onClick={()=>{handleSearch()}} >Search</button>
      </div>
          <div className='d-flex flex-wrap mt-5 ms-4'>
            {doctors.map((doctor) => (
                <DoctorComponent
                  doctor={doctor}
                  key={doctor.doctorId}></DoctorComponent>
            ))}
            </div>

    </div>
    </>
  );
};

export default FindDoctors;
