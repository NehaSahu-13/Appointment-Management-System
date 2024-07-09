package com.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appointment.Entity.Timings;

public interface TimingsRepository extends JpaRepository<Timings,Integer>{

}
