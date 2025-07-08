package dev.samuelGJ.real_blog.service;

public interface ClapService {

    boolean addClap(String anonymouString, Long postId);

    int getTotalClapsByPostId(Long postId);

}
