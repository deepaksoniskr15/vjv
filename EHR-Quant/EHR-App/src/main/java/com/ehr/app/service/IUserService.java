package com.ehr.app.service;

import org.springframework.stereotype.Service;

import com.ehr.app.model.User;

@Service
public interface IUserService {

	void register(User user);

}
