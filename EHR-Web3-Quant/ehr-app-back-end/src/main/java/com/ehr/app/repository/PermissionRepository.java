package com.ehr.app.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ehr.app.model.Permission;

@Repository
public interface PermissionRepository extends MongoRepository<Permission, String> {

	List<Permission> findByRequesterAddress(String walletAddress);

	List<Permission> findByPatientAddress(String walletAddress);

}
