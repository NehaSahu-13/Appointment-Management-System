package com.appointment.Service;

import java.util.List;

import com.appointment.Entity.Timings;
import com.appointment.Response.TimingsResponse;


public interface TimingService {

	    public Timings AddTiming(Timings timing,String username);
		
		public boolean deleteTiming(int id);
		
		public Timings updateTiming(TimingsResponse timResp);
		
		public List<Timings> getAllTimings(String username);
		
		public TimingsResponse getTimingsResponse(Timings timings);
}
