package dev.samuelGJ.real_blog.repository;

import dev.samuelGJ.real_blog.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findByCreatedBy(Long userId, Pageable pageable);
} 