package com.appointment.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.appointment.Entity.Department;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Patient;
import com.appointment.Response.DepartmentResponse;

public interface DepartmentService {

    public Department addDepartment(String name,MultipartFile image);
	
	public boolean deleteDepartment(int id);
	
	public Patient getDepartmentById(int id);
	
	public List<Department> getAllDepartments();
    
	public Department updateDepartment(int id,String name,MultipartFile image);
	
	public DepartmentResponse getDepartmentResponse(Department dep);
	
	public List<Department> searchDepartments(String name);
	
	public List<Doctor> getDoctorsByDepartment(int id);
	
}
