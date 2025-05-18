package dev.samuelGJ.real_blog.service.impl;



import dev.samuelGJ.real_blog.exception.*;
import dev.samuelGJ.real_blog.model.role.Role;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.model.user.Address;
import dev.samuelGJ.real_blog.model.user.Company;
import dev.samuelGJ.real_blog.model.user.Geo;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.*;
import dev.samuelGJ.real_blog.payload.request.InfoRequest;
import dev.samuelGJ.real_blog.payload.request.AddUserRequestDto;
import dev.samuelGJ.real_blog.payload.request.UserUpdateDto;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.UserIdentityAvailabilityResponse;
import dev.samuelGJ.real_blog.repository.PostRepository;
import dev.samuelGJ.real_blog.repository.RoleRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;


	private final PostRepository postRepository;


	private final RoleRepository roleRepository;


	private final PasswordEncoder passwordEncoder;

	private final ModelMapper modelMapper;

	@Override
	public UserSummary getCurrentUser(UserPrincipal currentUser) {
		return new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getFirstName(),
				currentUser.getLastName());
	}

	@Override
	public UserIdentityAvailabilityResponse checkUsernameAvailability(String username) {
		Boolean isAvailable = !userRepository.existsByUsername(username);
		return new UserIdentityAvailabilityResponse(isAvailable);
	}

	@Override
	public UserIdentityAvailabilityResponse checkEmailAvailability(String email) {
		Boolean isAvailable = !userRepository.existsByEmail(email);
		return new UserIdentityAvailabilityResponse(isAvailable);
	}

	@Override
	public UserProfile getUserProfile(String username) {
		return getUser(username);
	}

	@Override
	public UserProfile addUser(AddUserRequestDto dto) {
		if (userRepository.existsByUsername(dto.getUsername())) {
			throw new BadRequestException("Username is already taken");
		}
		if (userRepository.existsByEmail(dto.getEmail())) {
			throw new BadRequestException("Email is already taken");
		}

		List<Role> roles = new ArrayList<>();
		roles.add(
				roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User role not set")));

		User user = modelMapper.map(dto, User.class);
		user.setRoles(roles);

		user.setPassword(passwordEncoder.encode(dto.getPassword()));

		return getUser(userRepository.save(user));
	}

	@Override
	public UserProfile updateUser(UserUpdateDto dto, String username, UserPrincipal currentUser) {
		User user = userRepository.getUserByName(username);
		if (user.getId().equals(currentUser.getId())
				|| currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			user.setFirstName(dto.getFirstName());
			user.setLastName(dto.getLastName());

			user.setPhone(dto.getPhone());
			user.setWebsite(dto.getWebsite());


			return  getUser(userRepository.save(user));

		}
		throw new UnauthorizedException("You don't have permission to update profile of: " + username);

	}

	@Override
	public ApiResponse deleteUser(String username, UserPrincipal currentUser) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User"));
		if (!user.getId().equals(currentUser.getId()) || !currentUser.getAuthorities()
				.contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			throw new AccessDeniedException("You don't have permission to delete profile of: " + username);
		}

		userRepository.deleteById(user.getId());

		return new ApiResponse(Boolean.TRUE, "You successfully deleted profile of: " + username);
	}

	@Override
	public ApiResponse giveAdmin(String username) {
		User user = userRepository.getUserByName(username);
		List<Role> roles = new ArrayList<>();
		roles.add(roleRepository.findByName(RoleName.ROLE_ADMIN)
				.orElseThrow(() -> new AppException("User role not set")));
		roles.add(
				roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User role not set")));
		user.setRoles(roles);
		userRepository.save(user);
		return new ApiResponse(Boolean.TRUE, "You gave ADMIN role to user: " + username);
	}

	@Override
	public ApiResponse removeAdmin(String username) {
		User user = userRepository.getUserByName(username);
		List<Role> roles = new ArrayList<>();
		roles.add(
				roleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new AppException("User role not set")));
		user.setRoles(roles);
		userRepository.save(user);
		return new ApiResponse(Boolean.TRUE, "You took ADMIN role from user: " + username);
	}

	@Override
	public UserProfile setOrUpdateInfo(UserPrincipal currentUser, InfoRequest infoRequest) {
		User user = userRepository.findByUsername(currentUser.getUsername())
				.orElseThrow(() -> new ResourceNotFoundException("User"));
		Geo geo = new Geo(infoRequest.getLat(), infoRequest.getLng());
		Address address = new Address(infoRequest.getStreet(), infoRequest.getSuite(), infoRequest.getCity(),
				infoRequest.getZipcode(), geo);
		Company company = new Company(infoRequest.getCompanyName(), infoRequest.getCatchPhrase(), infoRequest.getBs());
		if (user.getId().equals(currentUser.getId())
				|| currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			user.setAddress(address);
			user.setCompany(company);
			user.setWebsite(infoRequest.getWebsite());
			user.setPhone(infoRequest.getPhone());
			User updatedUser = userRepository.save(user);

			return getUser(updatedUser);
		}

		throw new AccessDeniedException("You don't have permission to update users profile");
	}


	private UserProfile getUser(String username) {
		User user = userRepository.getUserByName(username);

		Long postCount = postRepository.countByCreatedBy(user.getId());

		return new UserProfile(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(),
				user.getCreatedAt(), user.getEmail(), user.getAddress(), user.getPhone(), user.getWebsite(),
				user.getCompany(), postCount);
	}

	private UserProfile getUser(User user) {

		Long postCount = postRepository.countByCreatedBy(user.getId());

		return new UserProfile(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(),
				user.getCreatedAt(), user.getEmail(), user.getAddress(), user.getPhone(), user.getWebsite(),
				user.getCompany(), postCount);
	}


}
