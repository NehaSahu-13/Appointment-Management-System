package com.appointment.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Department {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int deptId;
	
	private String name;
	
	private String image;
	
	@OneToMany(mappedBy="department",cascade=CascadeType.ALL)
	@JsonIgnore
	private List<Doctor> doctor;

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	

	public List<Doctor> getDoctor() {
		return doctor;
	}

	public void setDoctor(List<Doctor> doctor) {
		this.doctor = doctor;
	}

	
	@Override
	public String toString() {
		return "Department [deptId=" + deptId + ", name=" + name + ", image=" + image + ", doctor=" + doctor + "]";
	}

	public Department(int deptId, String name, String image, List<Doctor> doctor) {
		super();
		this.deptId = deptId;
		this.name = name;
		this.image = image;
		this.doctor = doctor;
	}

	public Department() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
