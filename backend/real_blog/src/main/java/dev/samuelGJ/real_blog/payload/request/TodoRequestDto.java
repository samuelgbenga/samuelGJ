package dev.samuelGJ.real_blog.payload.request;


public record TodoRequestDto (
        String title,

        boolean completed
){
}
