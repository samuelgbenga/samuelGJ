package dev.samuelGJ.real_blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.samuelGJ.real_blog.model.audit.UserDateAudit;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import jakarta.persistence.*; // Changed from javax.persistence.*
import lombok.*;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "photos", uniqueConstraints = { @UniqueConstraint(columnNames = { "title" }) })
public class Photo extends UserDateAudit {
	private static final long serialVersionUID = 1L;

	@Id
	private String id;

	@Column(name = "url")
	private String url;

	@Column(name = "thumbnail_url")
	private String thumbnailUrl;

	public Photo(  String url, String thumbnailUrl) {

		this.id = UUID.randomUUID().toString();
		this.url = url;
		this.thumbnailUrl = thumbnailUrl;

	}

	public Photo( String publicId, String url, String thumbnailUrl) {
		id = publicId;
		this.url = url;
		this.thumbnailUrl = thumbnailUrl;

	}

}
