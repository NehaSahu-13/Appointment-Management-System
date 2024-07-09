package com.appointment.Entity;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Timings {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int timeId;
	
	private String days;
	
	private String shifts;
	
	private String startTime;
	
	private String endTime;
	
	@ManyToOne
	@JsonIgnore
	private Doctor doctor;

	public int getTimeId() {
		return timeId;
	}

	public void setTimeId(int timeId) {
		this.timeId = timeId;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public String getShifts() {
		return shifts;
	}

	public void setShifts(String shifts) {
		this.shifts = shifts;
	}

	

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	@Override
	public String toString() {
		return "Timings [timeId=" + timeId + ", days=" + days + ", shifts=" + shifts + ", startTime=" + startTime
				+ ", endTime=" + endTime + ", doctor=" + doctor + "]";
	}


	
	public Timings(int timeId, String days, String shifts, String startTime, String endTime, Doctor doctor) {
		super();
		this.timeId = timeId;
		this.days = days;
		this.shifts = shifts;
		this.startTime = startTime;
		this.endTime = endTime;
		this.doctor = doctor;
	}

	public Timings() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
