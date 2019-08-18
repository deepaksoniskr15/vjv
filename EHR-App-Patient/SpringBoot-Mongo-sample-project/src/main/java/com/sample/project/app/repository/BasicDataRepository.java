package com.sample.project.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sample.project.app.model.BasicData;

@Repository
public interface BasicDataRepository extends MongoRepository<BasicData, String> {

	BasicData findByHash(String hash);

}
