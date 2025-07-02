package dev.samuelGJ.real_blog.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.samuelGJ.real_blog.model.audit.UserDateAudit;
import dev.samuelGJ.real_blog.model.user.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

import jakarta.persistence.*; // Changed from javax.persistence.*
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "projects", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
public class Project extends UserDateAudit {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "programming_language")
	private String programmingLanguage;


	private List<String> frameworks = new ArrayList<>();

	private String url;

	private String description;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "project_id")
	private List<Photo> photos = new ArrayList<>();

}
