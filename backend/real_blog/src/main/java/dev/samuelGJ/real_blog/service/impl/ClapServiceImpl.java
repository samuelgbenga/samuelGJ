package dev.samuelGJ.real_blog.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.model.Clap;
import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.repository.ClapRepository;
import dev.samuelGJ.real_blog.repository.PostRepository;
import dev.samuelGJ.real_blog.service.ClapService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClapServiceImpl implements ClapService {

    private final ClapRepository clapRepository;
    private final PostRepository postRepository;
    

    @Override
    public boolean addClap(String anonymousId, Long postId) {
        // Find the post first
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        
        // Check if clap already exists for this anonymous user and post
        Optional<Clap> existingClap = clapRepository.findByAnonymousIdAndPostId(anonymousId,  postId);
        
        if (existingClap.isPresent()) {
            // Check if user has already clapped maximum times (7)
            Clap clap = existingClap.get();
            if (clap.getCount() >= 7) {
                return false; // User has already clapped maximum times
            }
            // Increment existing clap count
            clap.setCount(clap.getCount() + 1);
            clapRepository.save(clap);
        } else {
            // Create new clap
            Clap newClap = new Clap();
            newClap.setAnonymousId(anonymousId);
            newClap.setPost(post);
            newClap.setCount(1);
            clapRepository.save(newClap);
        }
        
        return true;
    }

    @Override
    public int getTotalClapsByPostId(Long postId) {
        // Find the post first
        postRepository.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        return clapRepository.getTotalClapsByPostId(postId);
    }

}
