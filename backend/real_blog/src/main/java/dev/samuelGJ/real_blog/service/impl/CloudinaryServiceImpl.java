package dev.samuelGJ.real_blog.service.impl;

import com.cloudinary.Cloudinary;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.service.CloudinaryService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    @Resource
    private Cloudinary cloudinary;

    @Override
    public PhotoResponse uploadFile(MultipartFile file) {
        try{
            HashMap<Object, Object> options = new HashMap<>();
            options.put("folder", "my_blog_folder");
            Map uploadedFile = cloudinary.uploader().upload(file.getBytes(), options);
            String publicId = (String) uploadedFile.get("public_id");
            String imgUrl = cloudinary.url().secure(true).generate(publicId);
            return new PhotoResponse(publicId, imgUrl, null);

        }catch (IOException e){
            e.printStackTrace();
            return null;
        }
    }

    @Async("taskExecutor")
    @Override
    public boolean deleteFile(String publicId) {
        try {
            Map result = cloudinary.uploader().destroy(publicId, new HashMap<>());
            return "ok".equals(result.get("result"));
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
