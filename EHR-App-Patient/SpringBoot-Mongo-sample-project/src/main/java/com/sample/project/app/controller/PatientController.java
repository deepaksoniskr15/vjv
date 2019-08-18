package com.sample.project.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sample.project.app.dto.ApiResponseDto;
import com.sample.project.app.dto.ApiResponseDto.ApiResponseDtoBuilder;
import com.sample.project.app.dto.PatientDto;
import com.sample.project.app.model.BasicData;
import com.sample.project.app.model.HospitalVisit;
import com.sample.project.app.model.MedicalProblem;
import com.sample.project.app.repository.BasicDataRepository;
import com.sample.project.app.repository.HospitalVisitRepository;
import com.sample.project.app.repository.MedicalProblemRepository;
import com.sample.project.app.service.IPatientService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PatientController {

	@Autowired
	private IPatientService patientService;

	@Autowired
	private BasicDataRepository basicDataRepository;

	@Autowired
	private MedicalProblemRepository medicalProblemRepository;

	@Autowired
	private HospitalVisitRepository hospitalVisitRepository;

	/*
	 * Api For Add Patient Information
	 * 
	 * @param patient
	 * 
	 * return
	 */

	@RequestMapping(value = "/patient/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ApiResponseDto addPatient(@RequestBody PatientDto patientDto) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		patientService.addPatient(patientDto);
		if (patientDto.getBasicData().getId() != null && patientDto.getMedicalProblem().getId() != null
				&& patientDto.getHospitalVisit().getId() != null) {
			apiResponseDtoBuilder.withMessage("Patient Has Been Added Successfully"+ " Hash : " + patientDto.getBasicData().getHash()).withStatus(HttpStatus.OK)
					.withData(patientDto);
		} else {
			apiResponseDtoBuilder.withMessage("fail").withStatus(HttpStatus.BAD_REQUEST);
		}
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Get Patient Information
	 * 
	 * @param patientId
	 */

	@RequestMapping(value = "/patient/get/hash/{hash}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto getPatient(@PathVariable String hash) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		BasicData basicData = basicDataRepository.findByHash(hash);
		MedicalProblem medicalProblem = medicalProblemRepository.findByHash(hash);
		HospitalVisit hospitalVisit = hospitalVisitRepository.findByHash(hash);
		PatientDto patient = new PatientDto();
		patient.setBasicData(basicData);
		patient.setMedicalProblem(medicalProblem);
		patient.setHospitalVisit(hospitalVisit);
		if (basicData != null) {
			apiResponseDtoBuilder.withMessage("success").withStatus(HttpStatus.OK).withData(patient);
		} else {
			apiResponseDtoBuilder.withMessage("No Patient Exists").withStatus(HttpStatus.NO_CONTENT);
		}
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Get All Patient
	 * 
	 * return
	 */

	@RequestMapping(value = "/patient/get/all", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto getAllPatient() {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		List<BasicData> list = basicDataRepository.findAll();
		apiResponseDtoBuilder.withMessage("success").withStatus(HttpStatus.OK).withData(list);
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Delete Patient
	 * 
	 * return
	 */

	@RequestMapping(value = "/patient/delete/{patientId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto deletePatient(@PathVariable String patientId) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		basicDataRepository.deleteById(patientId);
		apiResponseDtoBuilder.withMessage("Patient Has Been Deleted Successfully").withStatus(HttpStatus.OK);
		return apiResponseDtoBuilder.build();
	}
}
