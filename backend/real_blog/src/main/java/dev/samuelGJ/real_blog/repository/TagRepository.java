package dev.samuelGJ.real_blog.repository;


import dev.samuelGJ.real_blog.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
	Tag findByName(String name);
}
