package dev.samuelGJ.real_blog.service;


import dev.samuelGJ.real_blog.payload.request.TodoRequestDto;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.response.TodoResponseDto;
import dev.samuelGJ.real_blog.security.UserPrincipal;

public interface TodoService {

	TodoResponseDto completeTodo(Long id, UserPrincipal currentUser);

	TodoResponseDto unCompleteTodo(Long id, UserPrincipal currentUser);

	PagedResponse<TodoResponseDto> getAllTodos(UserPrincipal currentUser, int page, int size);

	TodoResponseDto addTodo(TodoRequestDto dto, UserPrincipal currentUser);

	TodoResponseDto getTodo(Long id, UserPrincipal currentUser);

	TodoResponseDto updateTodo(Long id, TodoRequestDto dto, UserPrincipal currentUser);

	ApiResponse deleteTodo(Long id, UserPrincipal currentUser);

}
