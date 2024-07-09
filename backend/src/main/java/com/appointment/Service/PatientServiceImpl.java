package com.appointment.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointment.Entity.Appointment;
import com.appointment.Entity.Patient;
import com.appointment.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService{

	@Autowired
	private PatientRepository patientRepository;
	
	
	@Override
	public Patient AddPatient(String name,String email,String password) {
		Patient newPatient=new Patient();
		newPatient.setEmail(email);
		newPatient.setName(name);
		newPatient.setPassword(password);
		Patient savedPatient=patientRepository.save(newPatient);
		return savedPatient;
	}

	@Override
	public boolean deletePatient(int id) {
		Patient patient=patientRepository.findById(id).get();
		patientRepository.delete(patient);
		return true;
	}

	@Override
	public Patient getPatientById(int id) {
		Patient patient=patientRepository.findById(id).get();
		return patient;
	}

	@Override
	public Patient updatePatient(int id,String name,String phonenumber,int age,String gender) {
		Patient patient=patientRepository.findById(id).get();
		patient.setAge(age);
		patient.setPhoneNumber(phonenumber);
		patient.setName(name);
		patient.setGender(gender);
		Patient savedPatient=patientRepository.save(patient);
		return savedPatient;
	}

	@Override
	public List<Patient> getAllPatients() {
		List<Patient>patients=patientRepository.findAll();
		return patients;
	}

	@Override
	public List<Appointment> getAppointments(String email) {
		Patient patient=patientRepository.findByEmail(email);
		List<Appointment>appointments=patient.getAppointments();
		return appointments;
	}

	@Override
	public Patient getPatientByUsername(String username) {
		Patient patient=patientRepository.findByEmail(username);
		return patient;
	}

	
}
