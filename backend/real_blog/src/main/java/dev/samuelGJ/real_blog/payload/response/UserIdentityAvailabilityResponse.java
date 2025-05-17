package dev.samuelGJ.real_blog.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserIdentityAvailabilityResponse {
	private Boolean available;

}
