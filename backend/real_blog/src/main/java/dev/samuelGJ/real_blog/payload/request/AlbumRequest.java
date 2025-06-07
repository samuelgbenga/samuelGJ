package dev.samuelGJ.real_blog.payload.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class AlbumRequest {

	private String title;

	private List<MultipartFile> multipartFiles = new ArrayList<>();

}
