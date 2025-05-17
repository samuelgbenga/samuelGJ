package dev.samuelGJ.real_blog.payload.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
public class PagedResponse<T> {
	private List<T> content = new ArrayList<>();
	private int page;
	private int size;
	private long totalElements;
	private int totalPages;
	private boolean last;


	public PagedResponse(List<T> content, int page, int size, long totalElements, int totalPages, boolean last) {
		setContent(content);
		this.page = page;
		this.size = size;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.last = last;
	}

}
