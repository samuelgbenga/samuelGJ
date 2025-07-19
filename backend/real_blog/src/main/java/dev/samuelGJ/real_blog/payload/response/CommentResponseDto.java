package dev.samuelGJ.real_blog.payload.response;


import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto extends UserDateAuditPayload {

        private Long id;
        private String body;
        private String username;
        private List<CommentResponseDto> replies = new ArrayList<>();

}
