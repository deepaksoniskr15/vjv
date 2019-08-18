package com.sample.project.app.dto;

import com.sample.project.app.model.BasicData;
import com.sample.project.app.model.HospitalVisit;
import com.sample.project.app.model.MedicalProblem;

public class PatientDto {
	private BasicData basicData;
	private MedicalProblem medicalProblem;
	private HospitalVisit hospitalVisit;

	public BasicData getBasicData() {
		return basicData;
	}

	public void setBasicData(BasicData basicData) {
		this.basicData = basicData;
	}

	public MedicalProblem getMedicalProblem() {
		return medicalProblem;
	}

	public void setMedicalProblem(MedicalProblem medicalProblem) {
		this.medicalProblem = medicalProblem;
	}

	public HospitalVisit getHospitalVisit() {
		return hospitalVisit;
	}

	public void setHospitalVisit(HospitalVisit hospitalVisit) {
		this.hospitalVisit = hospitalVisit;
	}

}
