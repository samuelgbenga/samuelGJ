package dev.samuelGJ.real_blog.utils;

import dev.samuelGJ.real_blog.enums.CategoryEnum;
import dev.samuelGJ.real_blog.enums.PostStatus;
import dev.samuelGJ.real_blog.model.Category;
import dev.samuelGJ.real_blog.model.Project;
import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.role.Role;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.repository.CategoryRepository;
import dev.samuelGJ.real_blog.repository.ProjectRepository;
import dev.samuelGJ.real_blog.repository.RoleRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.TimeZone;
import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.repository.PostRepository;
import dev.samuelGJ.real_blog.model.Certification;
import dev.samuelGJ.real_blog.repository.CertificationRepository;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProjectRepository projectRepository;
    private final PostRepository postRepository;
    private final CertificationRepository certificationRepository;

    @PostConstruct
    public void init() {
        initializeRoles();
        initializeCategories();
        initializeProjects();
        initializePosts();
        initializeCertifications();
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

    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = List.of(CategoryEnum.values()).stream()
                .map(categoryEnum -> {
                    Category category = new Category();
                    category.setCategoryEnum(categoryEnum);
                    return category;
                })
                .toList();

            categoryRepository.saveAll(categories);
            log.info("Initialized categories: {}", categories.stream()
                .map(category -> category.getCategoryEnum().name())
                .toList());
        }
    }

    private void initializeProjects() {
        if (projectRepository.count() == 0 && userRepository.count() > 0) {
            User owner = userRepository.findAll().get(0);
            String photoUrl = "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1752419281/pres1proj_olw1ca.png";
            String photoUrl1 = "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1752420938/figmaImage_bf3vzg.webp";
            //String publicId = "pres1proj_olw1ca";
            for (int i = 1; i <= 5; i++) {
                Project project = new Project();
                project.setName("Sample Project " + i);
                project.setProgrammingLanguage("Java");
                project.setFrameworks(List.of("Spring Boot", "Hibernate"));
                project.setUrl("https://github.com/sample/project" + i);
                project.setDescription("This is a sample project number " + i);
                project.setStars(10 * i);
                project.setUser(owner);
                // Add photo
                Photo photo = new Photo( photoUrl);
                Photo photo1 = new Photo( photoUrl1);
                project.setPhotos(List.of(photo, photo1));
                projectRepository.save(project);
            }
            log.info("Initialized 5 sample projects with photos");
        }
    }

    private void initializePosts() {
        // Only add posts if none exist and we have a user and category
        if (postRepository.count() == 0 && userRepository.count() > 0 && categoryRepository.count() > 0) {
            User owner = userRepository.findAll().get(0);
            Category category = categoryRepository.findAll().get(1);
            String photoUrl = "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1752419281/pres1proj_olw1ca.png";
            for (int i = 1; i <= 5; i++) {
                Post post = new Post();
                post.setTitle("Sample Post " + i);
                post.setBody("This is the body of sample post number " + i + ".");
                post.setDescription("This is a description for sample post number " + i);
                post.setPostStatus(PostStatus.PUBLISHED);
                post.setUser(owner);
                post.setCategory(category);
                // Add photo
                Photo photo = new Photo(photoUrl);
                post.setPhoto(photo);
                // Optionally add tags if any exist
                postRepository.save(post);
            }
            log.info("Initialized 5 sample posts");
        }
    }

    private void initializeCertifications() {
        if (certificationRepository.count() == 0 && userRepository.count() > 0) {
            User owner = userRepository.findAll().get(0);
            String credentialUrl = "https://res.cloudinary.com/dbrqyy9fu/image/upload/v1752419281/pres1proj_olw1ca.png";
            for (int i = 1; i <= 5; i++) {
                Certification cert = new Certification();
                cert.setName("Sample Certification " + i);
                cert.setIssuer("Issuer " + i);
                cert.setDescription("This is a sample certification number " + i);
                cert.setIssueDate(java.time.LocalDate.now().minusYears(i));
                cert.setExpireDate(java.time.LocalDate.now().plusYears(i));
                cert.setCredentialUrl(credentialUrl);
                cert.setUser(owner);
                certificationRepository.save(cert);
            }
            log.info("Initialized 5 sample certifications");
        }
    }
}
