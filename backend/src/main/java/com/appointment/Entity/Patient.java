package com.appointment.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Patient {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int patientId;
	
	private String name;
	
	private String email;
	
	private String phoneNumber;
	
	private int age;
	
	private String gender;
	
	private String password;
	
	@OneToMany(mappedBy="patient",cascade=CascadeType.ALL)
	private List<Appointment> appointments;

	

	
	public Patient(int patientId, String name, String email, String phoneNumber, int age, String gender,
			String password, List<Appointment> appointments) {
		super();
		this.patientId = patientId;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.age = age;
		this.gender = gender;
		this.password = password;
		this.appointments = appointments;
	}



	@Override
	public String toString() {
		return "Patient [patientId=" + patientId + ", Name=" + name + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", age=" + age + ", Gender=" + gender + ", password=" + password + ", appointments="
				+ appointments + "]";
	}



	public int getPatientId() {
		return patientId;
	}



	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getPhoneNumber() {
		return phoneNumber;
	}



	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}



	public int getAge() {
		return age;
	}



	public void setAge(int age) {
		this.age = age;
	}



	public String getGender() {
		return gender;
	}



	public void setGender(String gender) {
		this.gender = gender;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public List<Appointment> getAppointments() {
		return appointments;
	}



	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}



	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
