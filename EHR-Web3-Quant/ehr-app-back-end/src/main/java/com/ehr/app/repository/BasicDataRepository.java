package com.ehr.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ehr.app.model.BasicData;

@Repository
public interface BasicDataRepository extends MongoRepository<BasicData, String> {

	BasicData findByHash(String hash);

	BasicData findByWalletAddress(String walletAddress);

}
