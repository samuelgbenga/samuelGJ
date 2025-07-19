package dev.samuelGJ.real_blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.samuelGJ.real_blog.model.audit.UserDateAudit;
import dev.samuelGJ.real_blog.model.user.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import jakarta.persistence.*; // Changed from javax.persistence.*
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comments")
public class Comment extends UserDateAudit {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "body")
    private String body;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    
    private String  username;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @Column(name = "path", nullable = false)
    private String path; // e.g., "1/4/9"

    @Column(name = "depth", nullable = false)
    private Integer depth;
}
