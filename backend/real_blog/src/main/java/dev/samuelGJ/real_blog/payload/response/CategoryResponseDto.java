package dev.samuelGJ.real_blog.payload.response;

import dev.samuelGJ.real_blog.enums.CategoryEnum;
import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CategoryResponseDto extends UserDateAuditPayload {

    private Long id;

    private CategoryEnum categoryEnum;

    private List<PostResponseDto> postsResponseDtoList = new ArrayList<>();
}
