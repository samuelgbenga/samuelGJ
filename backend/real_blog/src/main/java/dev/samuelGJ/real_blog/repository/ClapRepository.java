package dev.samuelGJ.real_blog.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.samuelGJ.real_blog.model.Clap;

public interface ClapRepository extends JpaRepository<Clap, Long> {

    Optional<Clap> findByAnonymousIdAndPostId(String anonymousId, Long postId);
    
    @Query("SELECT COALESCE(SUM(c.count), 0) FROM Clap c WHERE c.post.id = :postId")
    int getTotalClapsByPostId(@Param("postId") Long postId);
    
}
