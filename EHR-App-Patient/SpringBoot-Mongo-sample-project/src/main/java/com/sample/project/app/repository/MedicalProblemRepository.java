package com.sample.project.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sample.project.app.model.MedicalProblem;

@Repository
public interface MedicalProblemRepository extends MongoRepository<MedicalProblem, String> {

	MedicalProblem findByHash(String hash);

}
