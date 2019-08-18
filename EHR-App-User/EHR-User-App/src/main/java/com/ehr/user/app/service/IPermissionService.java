package com.ehr.user.app.service;

import org.springframework.stereotype.Service;

import com.ehr.user.app.model.Permission;

@Service
public interface IPermissionService {

	void addPermission(Permission permission);

}
