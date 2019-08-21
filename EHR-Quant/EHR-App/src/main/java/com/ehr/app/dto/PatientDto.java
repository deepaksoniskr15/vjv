package com.ehr.app.dto;

import com.ehr.app.model.BasicData;
import com.ehr.app.model.HospitalVisit;
import com.ehr.app.model.MedicalProblem;

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
