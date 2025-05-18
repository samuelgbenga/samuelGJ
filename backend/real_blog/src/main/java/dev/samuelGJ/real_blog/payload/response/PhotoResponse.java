package dev.samuelGJ.real_blog.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.samuelGJ.real_blog.payload.UserDateAuditPayload;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class PhotoResponse extends UserDateAuditPayload {
	private String id;

	private String url;
	private String thumbnailUrl;


	public PhotoResponse(String id, String url, String thumbnailUrl) {
		this.id = id;
		this.url = url;
		this.thumbnailUrl = thumbnailUrl;

	}

}
