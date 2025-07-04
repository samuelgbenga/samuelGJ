package dev.samuelGJ.real_blog.model.role;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;


@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(name = "name")
	private RoleName name;

	public Role(RoleName name) {
		this.name = name;
	}
}
