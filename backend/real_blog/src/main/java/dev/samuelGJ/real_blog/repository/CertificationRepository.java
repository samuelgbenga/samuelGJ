package dev.samuelGJ.real_blog.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.samuelGJ.real_blog.model.Certification;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    Page<Certification> findByCreatedBy(Long id, Pageable pageable);
    
}
