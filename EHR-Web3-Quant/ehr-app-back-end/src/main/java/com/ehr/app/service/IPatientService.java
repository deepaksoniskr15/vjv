package com.ehr.app.service;

import org.springframework.stereotype.Service;

import com.ehr.app.dto.PatientDto;

@Service
public interface IPatientService {

	void addPatient(PatientDto patientDto);

}
