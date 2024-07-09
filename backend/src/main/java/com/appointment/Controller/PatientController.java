package com.appointment.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appointment.Entity.Appointment;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Patient;
import com.appointment.Response.AppointmentResponse;
import com.appointment.Service.AppointmentService;
import com.appointment.Service.PatientService;
import com.appointment.repository.AppointmentRepository;
import com.appointment.repository.PatientRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	private PatientRepository patientRepository;
	
	
	@GetMapping("/patient/{id}")
	public ResponseEntity<Patient> getPatientById(@PathVariable("id") int id){
		Patient patient=patientService.getPatientById(id);
		return ResponseEntity.ok(patient);
	}
	
	
	@DeleteMapping("/patient/{id}")
	public ResponseEntity<Map<String,Boolean>> deletePatient(@PathVariable int id) {
        boolean deleted = false;
        deleted = patientService.deletePatient(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
	
	@GetMapping("/patient")
	public  ResponseEntity<List<Patient>> getAllPatients(){
		List<Patient>patients=patientService.getAllPatients();
		return ResponseEntity.ok(patients);
	}
	
	@GetMapping("/getPatientAppointments/{email}")
	public ResponseEntity<List<AppointmentResponse>> getAppointments(@PathVariable("email") String email){
		List<Appointment>appointments=patientService.getAppointments(email);
		List<AppointmentResponse>list=new ArrayList<>();
		for(Appointment apt:appointments) {
			AppointmentResponse res=appointmentService.getAppointmentResponse(apt);
			list.add(res);
		}
		Collections.reverse(list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/getPatientProfile/{email}")
	public ResponseEntity<Patient> getPatientProfile(@PathVariable("email") String email){
		Patient patient=patientService.getPatientByUsername(email);
		return ResponseEntity.ok(patient);
	}
	
	@PutMapping("/updatePatientProfile/{id}")
	public ResponseEntity<Patient> updatePatient(@PathVariable("id") int id,@RequestParam("name") String name,@RequestParam("phoneNumber") String phoneNumber,@RequestParam("age") int age,@RequestParam("gender") String gender){
		Patient patient=patientService.updatePatient(id,name,phoneNumber,age,gender);
		return ResponseEntity.ok(patient);
		
	}
	
	@PostMapping("/patient_changepassword/{email}")
	public ResponseEntity<?> ChangePassword(@PathVariable("email") String email,@RequestParam("currpassword") String currpassword,@RequestParam("newpassword") String newpassword,@RequestParam("confirmpassword") String confirmpassword) {
		Patient patient=patientRepository.findByEmail(email);
		if (!newpassword.equals(confirmpassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New password and confirm password do not match.");
        }
        if(!currpassword.equals(patient.getPassword())) {
        	  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password do not match.");
        }
        patient.setPassword(newpassword);
        patientRepository.save(patient);
	    return ResponseEntity.ok(patient);

	}
	
}
