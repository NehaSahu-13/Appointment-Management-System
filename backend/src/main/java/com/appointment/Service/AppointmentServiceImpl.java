package com.appointment.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointment.DTO.AppointmentDTO;
import com.appointment.Entity.Appointment;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Patient;
import com.appointment.Response.AppointmentResponse;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.PatientRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService{

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Override
	public Appointment createAppointment(AppointmentDTO appointmentDTO,String email) {
		Appointment appointment=new Appointment();
		Doctor doctor=doctorService.getDoctorById(appointmentDTO.getDoctorId());
		Patient patient=patientRepository.findByEmail(email);
		appointment.setAptDate(appointmentDTO.getDate());
		appointment.setAptTime(appointmentDTO.getTime());
		appointment.setDoctor(doctor);
		appointment.setPatient(patient);
		appointment.setPatientName(appointmentDTO.getName());
		appointment.setPhoneNumber(appointmentDTO.getPhoneNumber());
		appointment.setStatus("Pending");
		appointmentRepository.save(appointment);
		return appointment;
	}



	@Override
	public List<Appointment> getAllAppointments() {
		List<Appointment>appointments=appointmentRepository.findAll();
		return appointments;
	}


	@Override
	public Appointment changeAppointmentStatus(String status, int id) {
		
		Appointment appointment=appointmentRepository.findById(id).get();
		appointment.setStatus(status);
		Appointment appoint=appointmentRepository.save(appointment);
		return appoint;
	}



	@Override
	public AppointmentResponse getAppointmentResponse(Appointment appointment) {
		AppointmentResponse appointResp=new AppointmentResponse();
		appointResp.setAppointmentId(appointment.getAppointmentId());
		appointResp.setAptDate(appointment.getAptDate());
		appointResp.setAptTime(appointment.getAptTime());
		appointResp.setDepartment(appointment.getDoctor().getDepartment().getName());
		appointResp.setDoctorName(appointment.getDoctor().getName());
		appointResp.setStatus(appointment.getStatus());
		return appointResp;
		
	}

}
