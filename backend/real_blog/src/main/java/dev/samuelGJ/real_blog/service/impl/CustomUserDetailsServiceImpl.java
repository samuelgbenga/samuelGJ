package dev.samuelGJ.real_blog.service.impl;


import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import dev.samuelGJ.real_blog.model.user.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService, CustomUserDetailsService {

	private final UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String usernameOrEmail) {
		User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail).orElse(null);
		return user == null ? UserPrincipal.create(new User()) : UserPrincipal.create(user);
	}

	@Override
	@Transactional
	public UserDetails loadUserById(Long id) {
		User user = userRepository.findById(id).orElse(null);
		return user == null ? UserPrincipal.create(new User()) : UserPrincipal.create(user);
	}
}
