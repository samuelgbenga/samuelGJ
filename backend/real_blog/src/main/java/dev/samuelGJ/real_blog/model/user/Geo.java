package dev.samuelGJ.real_blog.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.samuelGJ.real_blog.model.audit.UserDateAudit;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "geo")
public class Geo extends UserDateAudit {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "lat")
	private String lat;

	@Column(name = "lng")
	private String lng;

	@OneToOne(mappedBy = "geo")
	private Address address;

	public Geo(String lat, String lng) {
		this.lat = lat;
		this.lng = lng;
	}

}
