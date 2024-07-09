package com.appointment.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appointment.DTO.AppointmentDTO;
import com.appointment.DTO.LoginRequestDto;
import com.appointment.Entity.Appointment;
import com.appointment.Entity.Department;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Patient;
import com.appointment.Response.DepartmentResponse;
import com.appointment.Response.DoctorResponse;
import com.appointment.Service.AppointmentService;
import com.appointment.Service.DepartmentService;
import com.appointment.Service.DoctorService;
import com.appointment.Service.PatientService;
import com.appointment.repository.DepartmentRepository;
import com.appointment.repository.DoctorRepository;
import com.appointment.repository.PatientRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
	
	   @Autowired
	   private DoctorRepository doctorRepository;
	   
	   @Autowired
	   private PatientRepository patientRepository;
	   
	   @Autowired
	   private DepartmentRepository departmentRepository;	

	   @Autowired
	   private PatientService patientService;
	   
	   @Autowired
	   private DoctorService doctorService;
	   
	   @Autowired
	   private DepartmentService departmentService;
	   
	   @Autowired
	   private AppointmentService appointmentService;
	   
	   
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequestDto user,HttpSession session){
		if(user.getRole().equals("Admin")&&user.getPassword().equals("4567")&&user.getUserName().equals("neha@gmail.com")) {
			 return ResponseEntity.ok("Neha");
		}
		else if(user.getRole().equals("Doctor")) {
			Doctor doctor=doctorRepository.findByEmail(user.getUserName());
			if(doctor.getPassword().equals(user.getPassword())) {
				return ResponseEntity.ok(doctor.getName());
			}
		}
		else if(user.getRole().equals("Patient")) {
			Patient patient=patientRepository.findByEmail(user.getUserName());
			if(patient.getPassword().equals(user.getPassword())==true) {
				return ResponseEntity.ok(patient.getName());
			}
		}
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}
	    
	    @PostMapping("/registerPatient")
	    public ResponseEntity<?> registerPatient(@RequestParam("name") String name,@RequestParam("email") String email,@RequestParam("password") String password){
	    	Patient patient=patientRepository.findByEmail(email);
	    	if(patient!=null) {
	    		 return ResponseEntity.status(HttpStatus.CONFLICT)
                         .body("Email already exists");
	    	}
	    	  patientService.AddPatient(name, email, password);
	    	   return ResponseEntity.status(HttpStatus.CREATED)
	    	                         .body("Registered successfully");
	    }
	    
	    @GetMapping("/searchDepartment/{name}")
	    public ResponseEntity<List<DepartmentResponse>> searchDepartments(@PathVariable("name") String name) {
	    	List<Department> departments=departmentService.searchDepartments(name);
	    	List<DepartmentResponse>list=new ArrayList<>();
			   for(Department department:departments) {
		       DepartmentResponse depRes=departmentService.getDepartmentResponse(department);
		       list.add(depRes);
			   }
	      return ResponseEntity.ok(list);
	      
	    }
	    
	    
	    @GetMapping("/getDoctorsByDepartment/{id}")
	    public ResponseEntity<List<DoctorResponse>> getDoctorsByDepartment(@PathVariable("id") int id){
	    	List<Doctor> doctors=departmentService.getDoctorsByDepartment(id);
	    	List<DoctorResponse>list=new ArrayList<>();
	    	for(Doctor doctor:doctors) {
	    		DoctorResponse docResp=new DoctorResponse();
	    		docResp=doctorService.getDoctorResponse(doctor);
	    		list.add(docResp);
	    	}
	    	return ResponseEntity.ok(list);
	    }
	    
	    @GetMapping("/getDoctorDetail/{id}")
	    public ResponseEntity<Doctor> getDoctorDetails(@PathVariable("id") int id){
	    	Doctor doctor=doctorService.getDoctorById(id);
	    	return ResponseEntity.ok(doctor);
	    }
	    
	    @PostMapping("/bookAppointment/{email}")
	    public ResponseEntity<Appointment> bookAppointment(@PathVariable("email") String email,@RequestBody AppointmentDTO aptDto){
	       Appointment appointment=appointmentService.createAppointment(aptDto, email)	;
	       return ResponseEntity.ok(appointment);
	    }
	    
	    @GetMapping("/searchDoctor/{name}")
	    public ResponseEntity<List<Doctor>> searchDoctors(@PathVariable("name") String name) {
	    	List<Doctor> doctors=doctorService.searchDoctors(name);
	        return ResponseEntity.ok(doctors);
	      
	    }
	    
}
