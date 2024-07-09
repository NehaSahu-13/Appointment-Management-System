package com.appointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appointment.Entity.Department;

public interface DepartmentRepository extends JpaRepository<Department,Integer>{

	public List<Department> findByNameContainingIgnoreCase(String name);

}
