package dev.samuelGJ.real_blog.payload.response;

import dev.samuelGJ.real_blog.model.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagResponseDto {


    private Long id;


    private String name;

    private List<PostResponseDto> postResponseDtoList = new ArrayList<>();
}
