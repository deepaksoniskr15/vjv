package com.sample.project.app.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.project.app.dto.PatientDto;
import com.sample.project.app.repository.BasicDataRepository;
import com.sample.project.app.repository.HospitalVisitRepository;
import com.sample.project.app.repository.MedicalProblemRepository;

@Service
public class PatientServiceImpl implements IPatientService {

	@Autowired
	private BasicDataRepository basicDataRepository;

	@Autowired
	private MedicalProblemRepository medicalProblemRepository;

	@Autowired
	private HospitalVisitRepository hospitalVisitRepository;

	@Override
	public void addPatient(PatientDto patientDto) {
		String hash = getHashCode(patientDto.getBasicData().getSocSecNo());
		patientDto.getBasicData().setHash(hash);
		patientDto.getMedicalProblem().setHash(hash);
		patientDto.getHospitalVisit().setHash(hash);
		basicDataRepository.save(patientDto.getBasicData());
		medicalProblemRepository.save(patientDto.getMedicalProblem());
		hospitalVisitRepository.save(patientDto.getHospitalVisit());
	}

	private String getHashCode(String originalString) {
		try {
			MessageDigest digest;
			digest = MessageDigest.getInstance("SHA-256");
			byte[] encodedhash = digest.digest(originalString.getBytes(StandardCharsets.UTF_8));
			String hash = bytesToHex(encodedhash);
			return hash;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}

	private static String bytesToHex(byte[] hash) {
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1)
				hexString.append('0');
			hexString.append(hex);
		}
		return hexString.toString();
	}
}
