package dev.samuelGJ.real_blog.utils;


import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
//@AllArgsConstructor
public class ApiResponse<T> {
    private HttpStatus status;
    private String message;
    private T data;
    private List<T> dataList;
    private Object metadata;

    public ApiResponse(HttpStatus status, String message, T data, Object metadata) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.metadata = metadata;
    }

    public ApiResponse(HttpStatus status, String message, List<T> dataList, Object metadata) {
        this.status = status;
        this.message = message;
        this.metadata = metadata;
        this.dataList = dataList;
    }
}
