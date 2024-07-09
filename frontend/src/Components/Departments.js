import React, { useState, useEffect } from 'react';
import HomeServices from '../Services/HomeServices';
import HomeImageComponent from './HomeImageComponent';
import { useNavigate } from 'react-router-dom';

const HomeDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await HomeServices.getAllDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await HomeServices.searchDepartment(searchTerm);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error searching departments', error);
    }
  };

 const showDoctors =(id,name)=>{
    navigate(`/showDoctors/${id}/${name}`);
 }

  return (
    <>
    <div className='base'>  </div>
    <div>  
      <div className='text-center my-5'>
      <h3 className='head'>Departments</h3>
      </div>
      <div className="d-flex search-box">
       <input className="form-control me-2 input-bar" type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for Department" aria-label="Search"/>
       <button className="btn btn-primary px-4" onClick={()=>{handleSearch()}} >Search</button>
      </div>
      <div className='mt-5 d-flex flex-wrap align-items-center justify-content-center ms-5'>
        {departments.map((department) => (
        <a className='card me-5 shadow bg-body rounded mb-5 text-decoration-none home-card' role="button" onClick={()=>{showDoctors(department.deptId,department.name)}} key={department.id}>
            <div className='card-body'>
                <div>
                    <HomeImageComponent filename={department.image}/>
                </div>
                <hr/>
                 <h5 className='text-center mt-2 head'>{department.name}</h5>
            </div>
        </a>
        ))}
      </div>

    </div>
    </>
  );
};

export default HomeDepartments;
