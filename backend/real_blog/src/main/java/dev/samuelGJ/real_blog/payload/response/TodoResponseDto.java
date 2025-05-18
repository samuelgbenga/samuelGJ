package dev.samuelGJ.real_blog.payload.response;

import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserSummary;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;


// for me to bookmark a topic to work on later
@Data
@NoArgsConstructor
public class TodoResponseDto {

    private Long id;

    private String title;

    private Boolean completed;

    private UserSummary userSummary;
}
