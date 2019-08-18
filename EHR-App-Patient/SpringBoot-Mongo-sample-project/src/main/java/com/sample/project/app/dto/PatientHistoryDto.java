package com.sample.project.app.dto;

import java.util.List;

public class PatientHistoryDto {
	private String diseaseName;
	private List<DataDto> data;

	public String getDiseaseName() {
		return diseaseName;
	}

	public void setDiseaseName(String diseaseName) {
		this.diseaseName = diseaseName;
	}

	public List<DataDto> getData() {
		return data;
	}

	public void setData(List<DataDto> data) {
		this.data = data;
	}

}
