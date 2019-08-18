package com.sample.project.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sample.project.app.model.HospitalVisit;

@Repository
public interface HospitalVisitRepository extends MongoRepository<HospitalVisit, String> {

	HospitalVisit findByHash(String hash);

}
