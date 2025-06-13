package dev.samuelGJ.real_blog.payload.response;

import java.util.ArrayList;
import java.util.List;

import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserSummary;
import lombok.Data;
import lombok.NoArgsConstructor;


// for me to bookmark a topic to work on later
@Data
@NoArgsConstructor
public class ProjectResponseDto {

    private Long id;

    private String name;

    private String language;

    private List<String> frameworks = new ArrayList<>();

    private String url;

    private String description;

    private UserSummary userSummary;
}
