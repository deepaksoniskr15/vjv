package com.ehr.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ehr.app.model.HospitalVisit;

@Repository
public interface HospitalVisitRepository extends MongoRepository<HospitalVisit, String> {

	HospitalVisit findByHash(String hash);

}
