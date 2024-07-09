package com.appointment.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.appointment.DTO.DoctorDTO;
import com.appointment.Entity.Appointment;
import com.appointment.Entity.Doctor;
import com.appointment.Response.DoctorResponse;

public interface DoctorService {

	public Doctor AddDoctor(DoctorDTO doctordto,MultipartFile image);
	
	public boolean deleteDoctor(int id);
	
	public Doctor getDoctorById(int id);
	
	public Doctor updateDoctor(Doctor doctor);
	
	public List<Doctor> getDoctorsByDepartment(int departmentId);
	
	public List<Doctor> getAllDoctors();
	
	public DoctorResponse getDoctorResponse(Doctor doctor);
	
	public Doctor updateDoctor(DoctorResponse doctorRes,MultipartFile image);
	
	public List<Doctor> searchDoctors(String name);
	
	public List<Appointment> getAppointments(String username);
	
	
	
}
