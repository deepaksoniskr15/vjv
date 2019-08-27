package com.ehr.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ehr.app.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{

	User findByEmail(String email);

	User findByEmailAndPassword(String username, String password);

	User findByWalletAddress(String walletAddress);

}
