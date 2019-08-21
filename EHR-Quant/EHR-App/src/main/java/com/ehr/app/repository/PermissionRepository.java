package com.ehr.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ehr.app.model.Permission;

@Repository
public interface PermissionRepository extends MongoRepository<Permission, String> {

}
