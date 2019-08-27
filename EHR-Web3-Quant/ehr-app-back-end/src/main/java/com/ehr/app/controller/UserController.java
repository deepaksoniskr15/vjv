package com.ehr.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ehr.app.dto.ApiResponseDto;
import com.ehr.app.dto.ApiResponseDto.ApiResponseDtoBuilder;
import com.ehr.app.dto.LoginUser;
import com.ehr.app.model.User;
import com.ehr.app.repository.UserRepository;
import com.ehr.app.service.IUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private IUserService userService;

	/*
	 * Api For User Register
	 * 
	 * @param user
	 * 
	 * return
	 */

	@RequestMapping(value = "/user/register", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ApiResponseDto userRegister(@RequestBody User user) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		User dbUser = userRepository.findByEmail(user.getEmail());
		if (dbUser == null) {
			User checkWalletddress = userRepository.findByWalletAddress(user.getWalletAddress());
			if (checkWalletddress == null) {
				userService.register(user);
				if (user.getId() != null) {
					apiResponseDtoBuilder.withMessage("User Registered Successfully").withStatus(HttpStatus.OK)
							.withData(user);
				} else {
					apiResponseDtoBuilder.withMessage("fail").withStatus(HttpStatus.BAD_REQUEST);
				}
			} else {
				apiResponseDtoBuilder.withMessage("Wallet Address Already Exists")
						.withStatus(HttpStatus.ALREADY_REPORTED);
			}
		} else {
			apiResponseDtoBuilder.withMessage("User Already Registered").withStatus(HttpStatus.ALREADY_REPORTED);
		}

		return apiResponseDtoBuilder.build();
	}

	/*
	 * Api For User Login
	 * 
	 * @param user
	 * 
	 * return
	 */

	@RequestMapping(value = "/user/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ApiResponseDto userlogin(@RequestBody LoginUser user, HttpServletRequest request) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		User dbUser = userRepository.findByEmailAndPassword(user.getUsername(), user.getPassword());
		if (dbUser != null) {
			request.getSession().setAttribute("username", user.getUsername());
			apiResponseDtoBuilder.withMessage("User Login Successfully").withStatus(HttpStatus.OK).withData(dbUser);
		} else {
			apiResponseDtoBuilder.withMessage("Invalid Credential").withStatus(HttpStatus.UNAUTHORIZED);
		}
		return apiResponseDtoBuilder.build();
	}

	@RequestMapping(value = "/user/logout", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ApiResponseDto logout(HttpServletRequest request) {
		ApiResponseDtoBuilder apiResponseDtoBuilder = new ApiResponseDtoBuilder();
		request.getSession().invalidate();
		apiResponseDtoBuilder.withMessage("Successfully Logout").withStatus(HttpStatus.OK);
		return apiResponseDtoBuilder.build();
	}
}
