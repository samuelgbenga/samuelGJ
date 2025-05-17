package dev.samuelGJ.real_blog.repository;


import dev.samuelGJ.real_blog.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	Page<Comment> findByPostId(Long postId, Pageable pageable);

	List<Comment> findByPostId(Long postId);

	List<Comment> findByPostIdAndDepth(Long postId, int depth); // For top-level

	List<Comment> findByPathStartingWith(String path); // Fetch children

	@Query("SELECT c FROM Comment c WHERE c.path LIKE CONCAT(:path, '/%')")
	List<Comment> findDescendants(String path);
}
