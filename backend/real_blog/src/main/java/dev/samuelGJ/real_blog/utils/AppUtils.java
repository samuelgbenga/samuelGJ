package dev.samuelGJ.real_blog.utils;

import dev.samuelGJ.real_blog.constant.AppConstants;
import dev.samuelGJ.real_blog.exception.BlogApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class AppUtils {
	public static void validatePageNumberAndSize(int page, int size) {
		if (page < 0) {
			throw new BlogApiException( "Page number cannot be less than zero.");
		}

		if (size < 0) {
			throw new BlogApiException( "Size number cannot be less than zero.");
		}

		if (size > AppConstants.MAX_PAGE_SIZE) {
			throw new BlogApiException( "Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
		}
	}
}
