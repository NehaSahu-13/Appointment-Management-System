package com.appointment.Service;

import java.util.List;

import com.appointment.Entity.Appointment;
import com.appointment.Entity.Patient;



public interface PatientService {

    public Patient AddPatient(String name,String email,String password);
	
	public boolean deletePatient(int id);
	
	public Patient getPatientById(int id);
	
	public Patient updatePatient(int id,String name,String phonenumber,int age,String gender);
	
	public List<Patient> getAllPatients();
	
	public List<Appointment> getAppointments(String email);
	
	public Patient getPatientByUsername(String username);
	
}
