package dev.samuelGJ.real_blog.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.samuelGJ.real_blog.model.audit.UserDateAudit;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table(name = "company")
public class Company extends UserDateAudit {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "catch_phrase")
	private String catchPhrase;

	@Column(name = "bs")
	private String bs;

	@OneToOne(mappedBy = "company")
	private User user;


	public Company(String name, String catchPhrase, String bs) {
		this.name = name;
		this.catchPhrase = catchPhrase;
		this.bs = bs;
	}

}
