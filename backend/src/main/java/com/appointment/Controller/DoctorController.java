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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.appointment.DTO.DoctorDTO;
import com.appointment.Entity.Appointment;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Timings;
import com.appointment.Response.DoctorResponse;
import com.appointment.Response.TimingsResponse;
import com.appointment.Service.AppointmentService;
import com.appointment.Service.DoctorService;
import com.appointment.Service.TimingService;
import com.appointment.repository.DoctorRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

	@Autowired
	private DoctorService doctorService;
	
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private TimingService timingService;
    
    
    @Autowired
    private AppointmentService appointmentService;
    
	
	@GetMapping("/doctor/{id}")
	public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") int id){
		Doctor doctor=doctorService.getDoctorById(id);
		return ResponseEntity.ok(doctor);
	}
	
	@PutMapping("/doctor")
	public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor){
		Doctor updatedDoctor=doctorService.updateDoctor( doctor);
		return ResponseEntity.ok(updatedDoctor);
	}
	

	
	@GetMapping("/doctor")
	public  ResponseEntity<List<DoctorResponse>> getAllDoctors(){
		List<Doctor>doctors=doctorService.getAllDoctors();
		List<DoctorResponse>res=new ArrayList<>();
		for(Doctor doctor:doctors) {
			res.add(doctorService.getDoctorResponse(doctor));
		}
		return ResponseEntity.ok(res);
	}
	
	@GetMapping("/profile/{username}")
	public ResponseEntity<DoctorResponse> getDoctorProfile(@PathVariable("username") String username){
		Doctor doctor=doctorRepository.findByEmail(username);
		DoctorResponse docResp=doctorService.getDoctorResponse(doctor);
		return ResponseEntity.ok(docResp);
	}

	@PutMapping("/updateDoctor")
	public ResponseEntity<?> updateDoctor(@RequestPart("doctorRes") DoctorResponse doctorRes,
            @RequestPart(value = "image", required = false) MultipartFile image) {
	   System.out.println("update doctor");
		Doctor savedDoctor=doctorService.updateDoctor(doctorRes,image);
	    return ResponseEntity.ok(savedDoctor);

	}
	
	@PostMapping("/doctor_changepassword/{email}")
	public ResponseEntity<?> ChangePassword(@PathVariable("email") String email,@RequestParam("currpassword") String currpassword,@RequestParam("newpassword") String newpassword,@RequestParam("confirmpassword") String confirmpassword) {
		Doctor doctor=doctorRepository.findByEmail(email);
		if (!newpassword.equals(confirmpassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New password and confirm password do not match.");
        }
        if(!currpassword.equals(doctor.getPassword())) {
        	  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password do not match.");
        }
        doctor.setPassword(newpassword);
        doctorRepository.save(doctor);
	    return ResponseEntity.ok(doctor);

	}
	
	@PostMapping("/addTiming/{email}")
	public ResponseEntity<Timings> addTiming(@PathVariable("email") String email,@RequestBody Timings timing){
		timingService.AddTiming(timing,email);
		return ResponseEntity.ok(timing);
	}
	
	@GetMapping("/getTimings/{email}")
	public ResponseEntity<List<TimingsResponse>> getTimings(@PathVariable("email") String email){
		List<Timings>timings=timingService.getAllTimings(email);
		List<TimingsResponse>list=new ArrayList<>();
		for(Timings tim:timings) {
			TimingsResponse timRes=timingService.getTimingsResponse(tim);
			list.add(timRes);
			
		}
		return ResponseEntity.ok(list);
	}
	
	@PutMapping("/updateTiming")
	public ResponseEntity<Timings> updateTiming(@RequestBody TimingsResponse timResp){
		System.out.println("ti"+timResp.getTimeId());
		Timings timing=timingService.updateTiming(timResp);
		return ResponseEntity.ok(timing);
	}
	
	@DeleteMapping("/deleteTiming/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteTiming(@PathVariable("id") int id){
		    boolean deleted = false;
	        deleted=timingService.deleteTiming(id);
	        Map<String,Boolean> response = new HashMap<>();
	        response.put("deleted", deleted);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/getAppointments/{email}")
	public ResponseEntity<List<Appointment>> getAppointments(@PathVariable("email") String email){
		List<Appointment>appointments=doctorService.getAppointments(email);
		Collections.reverse(appointments);
		return ResponseEntity.ok(appointments);
	}
	
	@PostMapping("/changeStatus/{id}/{status}")
	public ResponseEntity<Appointment> changeStatus(@PathVariable("id") int id,@PathVariable("status") String status){
		
		 Appointment appointment=appointmentService.changeAppointmentStatus(status, id);
		 return ResponseEntity.ok(appointment);
	}
	
}
