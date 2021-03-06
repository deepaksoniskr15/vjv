package com.ehr.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ehr.app.model.Permission;
import com.ehr.app.repository.PermissionRepository;

@Service
public class PermissionServiceImpl implements IPermissionService {

	@Autowired
	private PermissionRepository permissionRepository;

	@Override
	public void addPermission(Permission permission) {
		permissionRepository.save(permission);
	}

}
