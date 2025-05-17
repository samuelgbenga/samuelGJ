package dev.samuelGJ.real_blog.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import dev.samuelGJ.real_blog.payload.UserSummary;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonInclude(Include.NON_NULL)
public class AlbumResponse extends UserDateAuditPayload {
	private Long id;

	private String title;

	private UserSummary userSummary;

	private List<PhotoResponse> photoResponseList = new ArrayList<>();


}
