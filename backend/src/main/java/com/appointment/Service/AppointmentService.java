package com.appointment.Service;

import java.util.List;

import com.appointment.DTO.AppointmentDTO;
import com.appointment.Entity.Appointment;
import com.appointment.Entity.Patient;
import com.appointment.Response.AppointmentResponse;

public interface AppointmentService {

	    public Appointment createAppointment(AppointmentDTO appointmentDTO,String email);
		
		public List<Appointment> getAllAppointments();
		
		public Appointment changeAppointmentStatus(String status,int id);
		
		public AppointmentResponse getAppointmentResponse(Appointment appointment);
		
		
}
