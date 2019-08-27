package com.ehr.app.service;

import org.springframework.stereotype.Service;

import com.ehr.app.model.Permission;

@Service
public interface IPermissionService {

	void addPermission(Permission permission);

}
