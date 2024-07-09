package com.appointment.Controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import com.appointment.Entity.Department;
import com.appointment.Entity.Doctor;
import com.appointment.Entity.Patient;
import com.appointment.Response.DepartmentResponse;
import com.appointment.Service.AppointmentService;
import com.appointment.Service.DepartmentService;
import com.appointment.Service.DoctorService;
import com.appointment.Service.FileService;
import com.appointment.Service.PatientService;
import com.appointment.repository.DepartmentRepository;

import jakarta.servlet.http.HttpServletResponse;



@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
	

	@Autowired
	private DepartmentService departmentService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private DepartmentRepository departmentRepository;
	
	
	@GetMapping("/getAllDepartments")
	public ResponseEntity<List<DepartmentResponse>> getAllDepartments(){
		List<Department>departments=departmentService.getAllDepartments();
		HashMap<Integer,String>map=new HashMap<>();
		List<DepartmentResponse>li=new ArrayList<>();
		for(Department dep:departments) {
			DepartmentResponse depRes=departmentService.getDepartmentResponse(dep);
			li.add(depRes);
		}
		return ResponseEntity.ok(li);
	}
	@GetMapping("/CountDepartments")
	public ResponseEntity<Integer> countDepartments(){
		List<Department>departments=departmentService.getAllDepartments();
		return ResponseEntity.ok(departments.size());
	}
	@GetMapping("/getAllAppointments")
	public ResponseEntity<List<Appointment>> getAllAppointments(){
		List<Appointment>appointments=appointmentService.getAllAppointments();
		return ResponseEntity.ok(appointments);
	}
	
	@GetMapping("/CountAppointments")
	public ResponseEntity<Integer> countAppointments(){
		List<Appointment>appointments=appointmentService.getAllAppointments();
		return ResponseEntity.ok(appointments.size());
	}
	
	@GetMapping("/CountDoctors")
	public  ResponseEntity<Integer> getAllDoctors(){
		List<Doctor>doctors=doctorService.getAllDoctors();
		return ResponseEntity.ok(doctors.size());
	}


	@GetMapping("/CountPatients")
	public  ResponseEntity<Integer> getAllPatients(){
		List<Patient>patients=patientService.getAllPatients();
		return ResponseEntity.ok(patients.size());
	}
	
	@PostMapping("/addDepartment")
	public ResponseEntity<?> addDepartment(@RequestParam("name") String name,@RequestParam("image") MultipartFile image) {
	
		Department savedDep=departmentService.addDepartment(name,image);
	    return ResponseEntity.ok(savedDep);

	}
	
	@GetMapping(value="/image/{imageName}",produces=MediaType.IMAGE_JPEG_VALUE)
	public void getImage(@PathVariable("imageName") String imageName,HttpServletResponse response) throws IOException {
		  String path="static/img";
		InputStream resource=fileService.getResource( path,imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
	}
	
	
	@PutMapping("/updateDepartment/{id}")
	public ResponseEntity<?> updateDepartment(@PathVariable("id") int id,@RequestParam("name") String name, @RequestParam(value = "image", required = false)  MultipartFile image) {
		Department savedDep=departmentService.updateDepartment(id,name,image);
	    return ResponseEntity.ok(savedDep);
	}
	
	@DeleteMapping("/department/{id}")
	public ResponseEntity<Map<String,Boolean>> Department(@PathVariable int id) {
        boolean deleted = false;
        deleted=departmentService.deleteDepartment(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
	
	@PostMapping("/addDoctor")
	public ResponseEntity<?> addDoctor(@RequestPart("doctordto") DoctorDTO doctordto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
	
		Doctor savedDoctor=doctorService.AddDoctor(doctordto,image);
	    return ResponseEntity.ok(savedDoctor);

	}
	
	@DeleteMapping("/deleteDoctor/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteDoctor(@PathVariable("id") int id) {

        boolean deleted = false;
        deleted=doctorService.deleteDoctor(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
	
	@DeleteMapping("/deletePatient/{id}")
	public ResponseEntity<Map<String,Boolean>> deletePatient(@PathVariable int id) {
        boolean deleted = false;
        deleted=patientService.deletePatient(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
	
}
