package dev.samuelGJ.real_blog.utils;

import dev.samuelGJ.real_blog.model.role.Role;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.TimeZone;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;

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
            System.out.println("Initialized roles: USER and ADMIN");
        }
    }
}
