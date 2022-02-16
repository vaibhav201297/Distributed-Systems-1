package com.searchservice.api.controllers;



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

import com.searchservice.api.entity.SearchHistory;
import com.searchservice.api.service.SearchHistoryService;



@RestController
@RequestMapping("/search")
public class SearchHistoryController {
	@Autowired SearchHistoryService svc;
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping
	public String hello() {
		return "Hello World";
	}
	
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/checkifexists")
	public ResponseEntity<byte[]> checkIfSearchExists(@RequestParam(value="airport") String airport, @RequestParam(value="userId") String userId,@RequestParam(value="dateSearched")String dateSearched,@RequestParam(value="hour") int hour) {
		
	
		SearchHistory result=svc.checkIfExists(userId, airport, dateSearched,hour);
		//System.out.println(result);
		if(result==null){
			return new ResponseEntity<byte[]>(new byte[0],HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<byte[]>(result.getPlotted_image(),HttpStatus.OK);
		}
	}
	
	
	
	@GetMapping("/getsearchhistory/{userId}")
	public List<SearchHistory> getSearches(@PathVariable(value="userId") String userId){
		return svc.getSearches(userId);
	}
	
	
	
	
	@PostMapping("/addsearchhistory")
	public ResponseEntity<String> addSearch(@RequestBody SearchHistory sh) {
		System.out.println(sh.getCreateDate());
		System.out.println(sh.getDateSearched());
		System.out.println(sh.getAirport());
		System.out.println(sh.getHour());
		System.out.println(sh.getPlotted_image());
		try {
		
		svc.addSearchHistory(sh);
		}
		catch(Exception e) {
			return new ResponseEntity<String>("Error Occured while updating Users Search History",HttpStatus.BAD_REQUEST);
		}
	return new ResponseEntity<String>("Added Successfully",HttpStatus.OK);	
	}
	
}
