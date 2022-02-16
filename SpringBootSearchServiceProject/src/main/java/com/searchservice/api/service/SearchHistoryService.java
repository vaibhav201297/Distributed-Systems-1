package com.searchservice.api.service;




import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.searchservice.api.entity.SearchHistory;
import com.searchservice.api.repositories.SearchHistoryRepository;

@Component
@Service
public class SearchHistoryService {
	@Autowired
	SearchHistoryRepository shr;

	
	public List<SearchHistory> getSearches(String userId) {
		List<SearchHistory> results= shr.findAll();
		List<SearchHistory> sh =new ArrayList<SearchHistory>();
		for(SearchHistory s:results) {
			if(s.getUserId().equalsIgnoreCase(userId)) {
				sh.add(s);
			}
		}
	return sh;
	}
	
	public SearchHistory addSearchHistory(SearchHistory sh) {
		//System.out.println(sh.getHour());
		long l=this.findMaxId()+1;
		//System.out.println(l);
		sh.setSearchId(l);
		return shr.save(sh);
	}
	
	public SearchHistory checkIfExists(String userId,String airport,String dateSearched, int hour) {
		
		
		System.out.println(userId);
		System.out.println(airport);
		System.out.println(hour);
		System.out.println(dateSearched);
		List<SearchHistory> results= shr.findAll();
		SearchHistory sh=new SearchHistory();
		
		for(SearchHistory s:results) {
			String[] datetime=s.getDateSearched().toString().split(" ");
			String dt=datetime[0];
			//System.out.println(airport);
			//System.out.println(s.getAirport());
			//System.out.println(userId);
			//System.out.println(s.getUserId());
			//System.out.println(dt);
			//System.out.println(dateSearched);
			if(s.getAirport().equalsIgnoreCase(airport) && s.getUserId().equalsIgnoreCase(userId) && dt.equalsIgnoreCase(dateSearched) && s.getHour()==hour) {
				sh=s;
				return sh;
			}
			else {
				sh=null;
			}
		}
	return sh;
	}
	
	public int findMaxId() {
		int result= shr.findAll().size();
	return result;
	}
	


}
