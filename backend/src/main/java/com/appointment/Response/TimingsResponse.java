package com.appointment.Response;

import java.time.LocalTime;

public class TimingsResponse {

    private int timeId;
	
	private String days;
	
	private String shifts;
	
	private String startTime;
	
	private String endTime;

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

	
	
	
}
