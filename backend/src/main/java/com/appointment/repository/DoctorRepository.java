package com.appointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.appointment.Entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Integer>{

	public Doctor findByEmail(String userName) ;
	
	public List<Doctor> findByNameContainingIgnoreCase(String name);
}
