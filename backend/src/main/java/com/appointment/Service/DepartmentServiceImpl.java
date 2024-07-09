package com.appointment.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.appointment.Entity.Department;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Patient;
import com.appointment.Response.DepartmentResponse;
import com.appointment.repository.DepartmentRepository;


@Service
public class DepartmentServiceImpl implements DepartmentService{

    @Autowired
	private DepartmentRepository departmentRepository;
	
    @Autowired
    private FileService fileService;
	
	@Override
	public Department addDepartment(String name,MultipartFile image) {
		String fileName=image.getOriginalFilename();
		try {
			String res=fileService.uploadImage(image);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Department dep=new Department();
		dep.setName(name);
		dep.setImage(fileName);
	    Department savedDep=departmentRepository.save(dep);
	    return savedDep;
	}

	@Override
	public boolean deleteDepartment(int id) {
		Department dep=departmentRepository.findById(id).get();
		departmentRepository.delete(dep);
		return true;
	}

	@Override
	public Patient getDepartmentById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Department> getAllDepartments() {
		List<Department>departments=departmentRepository.findAll();
		return departments;
	}

	@Override
	public Department updateDepartment(int id,String name, MultipartFile image) {
		Department oldDepDetail=departmentRepository.findById(id).get();
		Department department=new Department();
		department.setDeptId(id);
		department.setName(name);
		department.setDoctor(oldDepDetail.getDoctor());
		try {
			   if(image==null) {
				department.setImage(oldDepDetail.getImage());
			   }
			  else {
				File deleteFile=new ClassPathResource("static/img").getFile();
				File file1=new File(deleteFile,oldDepDetail.getImage());
				file1.delete();				
				
				fileService.uploadImage(image);
				
				department.setImage(image.getOriginalFilename());
			   }
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		departmentRepository.save(department);
		return department;
	}

	@Override
	public DepartmentResponse getDepartmentResponse(Department dep) {
		DepartmentResponse depRes=new DepartmentResponse();
		depRes.setDeptId(dep.getDeptId());
		depRes.setName(dep.getName());
		depRes.setImage(dep.getImage());
		return depRes;
	}

	@Override
	public List<Department> searchDepartments(String name) {
		   List<Department> departments=departmentRepository.findByNameContainingIgnoreCase(name);
		   return departments;
	}

	@Override
	public List<Doctor> getDoctorsByDepartment(int id) {
		Department department=departmentRepository.findById(id).get();
		List<Doctor>list=department.getDoctor();
		return list;
	}

	
	

}
