package dev.samuelGJ.real_blog.service;

import dev.samuelGJ.real_blog.model.BlogPost;
import dev.samuelGJ.real_blog.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogPostService {


    private final BlogPostRepository blogPostRepository;

    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll();
    }

    public BlogPost createPost(BlogPost blogPost) {
        blogPost.setTimestamp(LocalDateTime.now());
        return blogPostRepository.save(blogPost);
    }

    public ResponseEntity<BlogPost> updatePost(Long id, BlogPost blogPost) {
        Optional<BlogPost> existingPost = blogPostRepository.findById(id);
        if (existingPost.isPresent()) {
            blogPost.setId(id);
            return ResponseEntity.ok(blogPostRepository.save(blogPost));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<Void> deletePost(Long id) {
        if (blogPostRepository.existsById(id)) {
            blogPostRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
