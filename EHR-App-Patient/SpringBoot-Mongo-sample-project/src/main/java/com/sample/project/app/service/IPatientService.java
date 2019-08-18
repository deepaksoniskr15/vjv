package com.sample.project.app.service;

import org.springframework.stereotype.Service;

import com.sample.project.app.dto.PatientDto;

@Service
public interface IPatientService {

	void addPatient(PatientDto patientDto);

}
