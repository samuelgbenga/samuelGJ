package dev.samuelGJ.real_blog.utils;

import dev.samuelGJ.real_blog.model.role.Role;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.repository.RoleRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.TimeZone;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    @PostConstruct
    public void init() {
        initializeRoles();

        // tell the time to consistently use this time zone regardless
        // of location or system definition
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            Role userRole = new Role(RoleName.ROLE_USER);
            Role adminRole = new Role(RoleName.ROLE_ADMIN);

            roleRepository.saveAll(List.of(userRole, adminRole));

            // replace with l4sjl
            log.info("Initialized roles: USER and ADMIN");
        }

        if(userRepository.count() == 0) {
            // replace with l4sjl
            log.info("Initialized users: none");
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("Admin");
            admin.setUsername("admin");
            admin.setEmail("samuel@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRoles(roleRepository.findAll());
            userRepository.save(admin);

            log.info("Initialized users: admin");
        }
    }
}
