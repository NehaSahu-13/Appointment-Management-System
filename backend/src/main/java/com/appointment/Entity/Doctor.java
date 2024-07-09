package com.appointment.Entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Doctor {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int doctorId;
	
	private String name;
	
	private String email;
	
	private String phoneNumber;
	
	private String gender;
	
	private String image;
	
	private String password;
	
	private String experience;
	
	private String qualification;
	
	private String specialization;
	
	private String bio;
	
	private String address;
	
	@OneToMany(mappedBy="doctor",cascade=CascadeType.ALL)
	private List<Appointment> appointments;
	
	@ManyToOne
	private Department department;
	
	@OneToMany(mappedBy="doctor",cascade=CascadeType.ALL)
    private List<Timings>timings;

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
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

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Appointment> getAppointments() {
		return appointments;
	}

	public void setAppointments(List<Appointment> appointments) {
		this.appointments = appointments;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public List<Timings> getTimings() {
		return timings;
	}

	public void setTimings(List<Timings> timings) {
		this.timings = timings;
	}

	@Override
	public String toString() {
		return "Doctor [DoctorId=" + this.doctorId + ", Name=" + name + ", email=" + email + ", phoneNumber=" + phoneNumber
				+ ", Gender=" + gender + ", image=" + image + ", password=" + password + ", experience=" + experience
				+ ", qualification=" + qualification + ", specialization=" + specialization + ", bio=" + bio
				+ ", address=" + address + ", appointments=" + appointments + ", department=" + department
				+ ", timings=" + timings + "]";
	}

	public Doctor(int doctorId, String name, String email, String phoneNumber, String gender, String image,
			String password, String experience, String qualification, String specialization, String bio, String address,
			List<Appointment> appointments, Department department, List<Timings> timings) {
		super();
		this.doctorId = doctorId;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.gender = gender;
		this.image = image;
		this.password = password;
		this.experience = experience;
		this.qualification = qualification;
		this.specialization = specialization;
		this.bio = bio;
		this.address = address;
		this.appointments = appointments;
		this.department = department;
		this.timings = timings;
	}

	/**
	 * 
	 */
	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
