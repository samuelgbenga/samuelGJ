package dev.samuelGJ.real_blog.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;


@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
@Getter
@Setter
@JsonIgnoreProperties(
		value = { "createdBY", "updatedBy" },
		allowGetters = true
)
public abstract class UserDateAudit extends DateAudit {
	private static final long serialVersionUID = 1L;

	@CreatedBy
	@Column(updatable = false)
	private Long createdBy;

	@LastModifiedBy
	private Long updatedBy;
}
