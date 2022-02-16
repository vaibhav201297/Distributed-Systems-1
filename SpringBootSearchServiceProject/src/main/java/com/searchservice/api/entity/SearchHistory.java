package com.searchservice.api.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="SearchHistory")
public class SearchHistory {

	
	public SearchHistory() {
		
	}
	public SearchHistory(Long searchId, String userId, String airport, Date createDate,int hour, Date dateSearched,byte[] plottedImage) {
		this.searchId = searchId;
		this.userId = userId;
		this.airport = airport;
		this.createDate = createDate;
		this.hour = hour;
		this.dateSearched = dateSearched;
		this.plottedImage = plottedImage;
	}
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="searchId")
	private Long searchId;
	@Column(name="userId")
	private String userId;
	@Column(name="airport")
	private String airport;
	@Column(name="dateCreated")
	private Date createDate;
	@Column(name="searchdate")
	private Date dateSearched;
	@Column(name="hour")
	private int hour;
	@Column(name="plotted_image")
	private byte[]  plottedImage;
	
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		this.hour = hour;
	}
	
	
	public Long getSearchId() {
		return searchId;
	}
	public void setSearchId(Long searchId) {
		this.searchId = searchId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAirport() {
		return airport;
	}
	public void setAirport(String airport) {
		this.airport = airport;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getDateSearched() {
		return dateSearched;
	}
	public void setDateSearched(Date dateSearched) {
		this.dateSearched = dateSearched;
	}
	public byte[] getPlotted_image() {
		return plottedImage;
	}
	public void setPlotted_image(byte[] plotted_image) {
		this.plottedImage = plotted_image;
	}
}
