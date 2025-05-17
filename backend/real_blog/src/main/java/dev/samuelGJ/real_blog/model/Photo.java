package dev.samuelGJ.real_blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.samuelGJ.real_blog.model.audit.UserDateAudit;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "photos", uniqueConstraints = { @UniqueConstraint(columnNames = { "title" }) })
public class Photo extends UserDateAudit {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "url")
	private String url;

	@Column(name = "thumbnail_url")
	private String thumbnailUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id")
	private Album album;

	public Photo(  String url, String thumbnailUrl, Album album) {

		this.url = url;
		this.thumbnailUrl = thumbnailUrl;
		this.album = album;
	}
}
