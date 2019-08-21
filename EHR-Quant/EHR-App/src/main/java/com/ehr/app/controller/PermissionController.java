package com.ehr.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ehr.app.dto.ApiResponseDto;
import com.ehr.app.dto.ApiResponseDto.ApiResponseDtoBuilder;
import com.ehr.app.model.Permission;
import com.ehr.app.repository.PermissionRepository;
import com.ehr.app.service.IPermissionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PermissionController {

	@Autowired
	private IPermissionService permissionService;

	@Autowired
	private PermissionRepository permissionRepository;

	/*
	 * Api For Add Patient Information
	 * 
	 * @param patient
	 * 
	 * return
	 */

	@RequestMapping(value = "/permission/add", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ApiResponseDto addPatient(@RequestBody Permission permission) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		permissionService.addPermission(permission);
		if (permission.getId() != null) {
			apiResponseDtoBuilder.withMessage("Permission Has Been Added Successfully").withStatus(HttpStatus.OK)
					.withData(permission);
		} else {
			apiResponseDtoBuilder.withMessage("fail").withStatus(HttpStatus.BAD_REQUEST);
		}
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Get Permission Information
	 * 
	 * @param patientId
	 */

	@RequestMapping(value = "/permission/get/{permissionId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto getPermission(@PathVariable String permissionId) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		Optional<Permission> permission = permissionRepository.findById(permissionId);
		if (permission.isPresent()) {
			apiResponseDtoBuilder.withMessage("success").withStatus(HttpStatus.OK).withData(permission);
		} else {
			apiResponseDtoBuilder.withMessage("No Permission Exists").withStatus(HttpStatus.NO_CONTENT);
		}
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Get Permission Information
	 * 
	 * @param patientId
	 */

	@RequestMapping(value = "/permission/status/{status}/{permissionId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto changeStatus(@PathVariable int status, @PathVariable String permissionId) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		Optional<Permission> permission = permissionRepository.findById(permissionId);
		if (permission.isPresent()) {
			permission.get().setStatus(status);
			permissionRepository.save(permission.get());
			apiResponseDtoBuilder.withMessage("Status Changed").withStatus(HttpStatus.OK).withData(permission);
		} else {
			apiResponseDtoBuilder.withMessage("No Permission Exists").withStatus(HttpStatus.NO_CONTENT);
		}
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Get All Permission
	 * 
	 * return
	 */

	@RequestMapping(value = "/permission/get/all", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto getAllPatient() {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		List<Permission> list = permissionRepository.findAll();
		apiResponseDtoBuilder.withMessage("success").withStatus(HttpStatus.OK).withData(list);
		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For Delete Patient
	 * 
	 * return
	 */

	@RequestMapping(value = "/permission/delete/{permissionId}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto deletePatient(@PathVariable String permissionId) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		permissionRepository.deleteById(permissionId);
		apiResponseDtoBuilder.withMessage("Permission Has Been Deleted Successfully").withStatus(HttpStatus.OK);
		return apiResponseDtoBuilder.build();
	}
}
