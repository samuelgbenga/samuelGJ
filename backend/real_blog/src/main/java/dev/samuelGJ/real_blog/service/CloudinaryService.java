package dev.samuelGJ.real_blog.service;



import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    PhotoResponse uploadFile(MultipartFile file);

    boolean deleteFile(String publicId);
}