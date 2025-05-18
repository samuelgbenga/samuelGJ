package dev.samuelGJ.real_blog.payload.request;


import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class AlbumRequest {

	private String title;

	private List<MultipartFile> multipartFiles = new ArrayList<>();

}
