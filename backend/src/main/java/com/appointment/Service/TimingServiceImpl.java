package com.appointment.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointment.Entity.Doctor;
import com.appointment.Entity.Timings;
import com.appointment.Response.TimingsResponse;
import com.appointment.repository.DoctorRepository;
import com.appointment.repository.TimingsRepository;

@Service
public class TimingServiceImpl implements TimingService{
	
	@Autowired
	private TimingsRepository timingsRepository;
	
	@Autowired
	private DoctorRepository doctorRepository;

	@Override
	public Timings AddTiming(Timings timing,String username) {
		Doctor doctor=doctorRepository.findByEmail(username);
		timing.setDoctor(doctor);
		timingsRepository.save(timing);
		return timing;
	}

	@Override
	public boolean deleteTiming(int id) {
		Timings timing=timingsRepository.findById(id).get();
		timingsRepository.delete(timing);
		return true;
	}

	@Override
	public Timings updateTiming(TimingsResponse timResp) {
		Timings timing=timingsRepository.findById(timResp.getTimeId()).get();
		timing.setDays(timResp.getDays());
		timing.setEndTime(timResp.getEndTime());
		timing.setStartTime(timResp.getStartTime());
		timing.setShifts(timResp.getShifts());
		timingsRepository.save(timing);
		return timing;
	}

	@Override
	public List<Timings> getAllTimings(String username) {
		Doctor doctor=doctorRepository.findByEmail(username);
		List<Timings>timings=doctor.getTimings();
		return timings;
	}

	@Override
	public TimingsResponse getTimingsResponse(Timings timings) {
		TimingsResponse timRes=new TimingsResponse();
		timRes.setTimeId(timings.getTimeId());
		timRes.setDays(timings.getDays());
		timRes.setStartTime(timings.getStartTime());
		timRes.setEndTime(timings.getEndTime());
		timRes.setShifts(timings.getShifts());
		return timRes;
	}

}
