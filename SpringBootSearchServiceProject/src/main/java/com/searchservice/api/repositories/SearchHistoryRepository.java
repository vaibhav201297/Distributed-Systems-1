package com.searchservice.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.searchservice.api.entity.SearchHistory;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory,Long>{

	
	
}	
	