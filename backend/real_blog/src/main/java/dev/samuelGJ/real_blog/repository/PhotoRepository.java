package dev.samuelGJ.real_blog.repository;


import dev.samuelGJ.real_blog.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, String> {
}
