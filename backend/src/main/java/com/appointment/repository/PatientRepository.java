package com.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appointment.Entity.Patient;

public interface PatientRepository extends JpaRepository<Patient,Integer>{

	public Patient findByEmail(String userName) ;
}
