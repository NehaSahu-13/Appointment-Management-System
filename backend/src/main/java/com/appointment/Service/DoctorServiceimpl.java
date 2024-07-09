package com.appointment.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.appointment.DTO.DoctorDTO;
import com.appointment.Entity.Appointment;
import com.appointment.Entity.Department;
import com.appointment.Entity.Doctor;
import com.appointment.Response.DoctorResponse;
import com.appointment.repository.DepartmentRepository;
import com.appointment.repository.DoctorRepository;

@Service
public class DoctorServiceimpl implements DoctorService{

	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
	private FileService fileService;

	@Override
	public Doctor AddDoctor(DoctorDTO doctordto,MultipartFile image)  {
		try {
			if(image!=null) {
			fileService.uploadImage(image);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		Doctor doctor=new Doctor();
		doctor.setBio(doctordto.getBio());
		doctor.setEmail(doctordto.getEmail());
		doctor.setExperience(doctordto.getExperience());
		doctor.setGender(doctordto.getGender());
		doctor.setName(doctordto.getName());
		doctor.setPassword(doctordto.getPassword());
		doctor.setPhoneNumber(doctordto.getPhoneNumber());
		doctor.setQualification(doctordto.getQualification());
		doctor.setSpecialization(doctordto.getSpecialization());
		doctor.setImage(image.getOriginalFilename());
		Department department=departmentRepository.findById(doctordto.getDepartment()).get();
		department.getDoctor().add(doctor);
		doctor.setDepartment(department);
		departmentRepository.save(department);
		return doctor;
	}


	@Override
	public Doctor getDoctorById(int id) {
		Doctor doctor=doctorRepository.findById(id).get();
		return doctor;
	}

	@Override
	public Doctor updateDoctor(Doctor doctor) {
		int id=doctor.getDoctorId();
		Doctor oldDoctorDetail=doctorRepository.findById(id).get();
		doctor.setAppointments(oldDoctorDetail.getAppointments());
		doctor.setDepartment(oldDoctorDetail.getDepartment());
		doctor.setEmail(oldDoctorDetail.getEmail());
		doctor.setPassword(oldDoctorDetail.getPassword());
		doctor.setTimings(oldDoctorDetail.getTimings());
		Doctor savedDoctor=doctorRepository.save(doctor);
		return savedDoctor;
	}

	@Override
	public List<Doctor> getDoctorsByDepartment(int departmentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Doctor> getAllDoctors() {
		List<Doctor>doctors=doctorRepository.findAll();
		return doctors;
	}


	@Override
	public DoctorResponse getDoctorResponse(Doctor doctor) {
		DoctorResponse docResp=new DoctorResponse();
		docResp.setBio(doctor.getBio());
		docResp.setDoctorId(doctor.getDoctorId());
		docResp.setEmail(doctor.getEmail());
		docResp.setExperience(doctor.getExperience());
		docResp.setGender(doctor.getGender());
		docResp.setImage(doctor.getImage());
		docResp.setName(doctor.getName());
		docResp.setPassword(doctor.getPassword());
		docResp.setPhoneNumber(doctor.getPhoneNumber());
		docResp.setQualification(doctor.getQualification());
		docResp.setSpecialization(doctor.getSpecialization());
		docResp.setDepartment(doctor.getDepartment().getName());
		return docResp;
	}

	@Override
	public Doctor updateDoctor(DoctorResponse doctorRes, MultipartFile image) {
		Doctor doctor=doctorRepository.findByEmail(doctorRes.getEmail());
		doctor.setBio(doctorRes.getBio());
		doctor.setExperience(doctorRes.getExperience());
		doctor.setGender(doctorRes.getGender());
		
			try {
				if(image!=null) {
				fileService.uploadImage(image);
				doctor.setImage(image.getOriginalFilename());
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		
		doctor.setName(doctorRes.getName());
		doctor.setPhoneNumber(doctorRes.getPhoneNumber());
		doctor.setQualification(doctorRes.getQualification());
		doctor.setSpecialization(doctorRes.getSpecialization());
		doctorRepository.save(doctor);
		return doctor;
	}

	@Override
	public boolean deleteDoctor(int id) {
		Doctor doctor=doctorRepository.findById(id).get();
		doctorRepository.delete(doctor);
		return true;
	}


	@Override
	public List<Doctor> searchDoctors(String name) {
		  List<Doctor> doctors=doctorRepository.findByNameContainingIgnoreCase(name);
	       return doctors;
	}


	@Override
	public List<Appointment> getAppointments(String username) {
		Doctor doctor=doctorRepository.findByEmail(username);
		List<Appointment>appointments=doctor.getAppointments();
		return appointments;
	}


	
	
	
	
}
