package dev.samuelGJ.real_blog.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PhotoResponse extends UserDateAuditPayload {
	private Long id;

	private String url;
	private String thumbnailUrl;
	private Long albumId;

	public PhotoResponse(Long id, String url, String thumbnailUrl, Long albumId) {
		this.id = id;
		this.url = url;
		this.thumbnailUrl = thumbnailUrl;
		this.albumId = albumId;
	}

}
