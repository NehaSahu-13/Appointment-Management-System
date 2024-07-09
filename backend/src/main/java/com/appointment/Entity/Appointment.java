package com.appointment.Entity;

import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Appointment {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int appointmentId;
	
	private String patientName;
	
	private String phoneNumber;
	
	private String aptDate;
	
	private String aptTime;
	
	private String status;
	
	@ManyToOne
	@JsonIgnore
	private Patient patient;
	
	
	@ManyToOne
	@JsonIgnore
	private Doctor doctor;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}


	public String getAptDate() {
		return aptDate;
	}

	public void setAptDate(String aptDate) {
		this.aptDate = aptDate;
	}

	public String getAptTime() {
		return aptTime;
	}

	public void setAptTime(String aptTime) {
		this.aptTime = aptTime;
	}
	
	


	public Appointment(int appointmentId, String patientName, String phoneNumber, String aptDate, String aptTime,
			String status, Patient patient, Doctor doctor) {
		super();
		this.appointmentId = appointmentId;
		this.patientName = patientName;
		this.phoneNumber = phoneNumber;
		this.aptDate = aptDate;
		this.aptTime = aptTime;
		this.status = status;
		this.patient = patient;
		this.doctor = doctor;
	}

	@Override
	public String toString() {
		return "Appointment [appointmentId=" + appointmentId + ", patientName=" + patientName + ", phoneNumber="
				+ phoneNumber + ", aptDate=" + aptDate + ", aptTime=" + aptTime + ", status=" + status + ", patient="
				+ patient + ", doctor=" + doctor + "]";
	}

	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}
