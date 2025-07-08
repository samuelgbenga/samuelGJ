package dev.samuelGJ.real_blog.model;

import dev.samuelGJ.real_blog.model.audit.DateAudit;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "clap")
public class Clap extends DateAudit {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    private String anonymousId;

    @ManyToOne
    private Post post;

    private int count;
    
}
