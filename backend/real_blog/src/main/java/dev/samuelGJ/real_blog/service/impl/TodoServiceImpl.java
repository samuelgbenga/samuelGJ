package dev.samuelGJ.real_blog.service.impl;

import dev.samuelGJ.real_blog.exception.BadRequestException;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Todo;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserSummary;
import dev.samuelGJ.real_blog.payload.request.TodoRequestDto;
import dev.samuelGJ.real_blog.payload.response.*;
import dev.samuelGJ.real_blog.repository.TodoRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.TodoService;
import dev.samuelGJ.real_blog.constant.AppConstants;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

import static dev.samuelGJ.real_blog.constant.AppConstants.*;


@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
	private final TodoRepository todoRepository;

	private final UserRepository userRepository;

	private final ModelMapper modelMapper;

	@Override
	public TodoResponseDto completeTodo(Long id, UserPrincipal currentUser) {
		Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(TODO));

		User user = userRepository.getUser(currentUser);

		if (todo.getUser().getId().equals(user.getId())) {
			todo.setCompleted(Boolean.TRUE);
			return fromTodoToDto(todoRepository.save(todo));
		}

		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public TodoResponseDto unCompleteTodo(Long id, UserPrincipal currentUser) {
		Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(TODO));
		User user = userRepository.getUser(currentUser);
		if (todo.getUser().getId().equals(user.getId())) {
			todo.setCompleted(Boolean.FALSE);
			return fromTodoToDto(todoRepository.save(todo));
		}

		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public PagedResponse<TodoResponseDto> getAllTodos(UserPrincipal currentUser, int page, int size) {
		validatePageNumberAndSize(page, size);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, CREATED_AT);

		Page<Todo> todos = todoRepository.findByCreatedBy(currentUser.getId(), pageable);

		List<Todo> content = todos.getNumberOfElements() == 0 ? Collections.emptyList() : todos.getContent();
		List<TodoResponseDto> todoResponseDtoList = content.stream().map(this::fromTodoToDto).toList();

		return new PagedResponse<>(todoResponseDtoList, todos.getNumber(), todos.getSize(), todos.getTotalElements(),
				todos.getTotalPages(), todos.isLast());
	}

	@Override
	public TodoResponseDto addTodo(TodoRequestDto dto, UserPrincipal currentUser) {
		User user = userRepository.getUser(currentUser);
		Todo todo = new Todo();
		todo.setTitle(dto.title());
		todo.setCompleted(dto.completed());
		todo.setUser(user);
		return fromTodoToDto(todoRepository.save(todo));
	}

	@Override
	public TodoResponseDto getTodo(Long id, UserPrincipal currentUser) {
		User user = userRepository.getUser(currentUser);
		Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(TODO));

		if (todo.getUser().getId().equals(user.getId())) {
			return fromTodoToDto(todo);
		}


		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public TodoResponseDto updateTodo(Long id, TodoRequestDto dto, UserPrincipal currentUser) {
		User user = userRepository.getUser(currentUser);
		Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(TODO));
		if (todo.getUser().getId().equals(user.getId())) {
			todo.setTitle(dto.title());
			todo.setCompleted(dto.completed());
			return fromTodoToDto(todoRepository.save(todo));
		}

		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	@Override
	public ApiResponse deleteTodo(Long id, UserPrincipal currentUser) {
		User user = userRepository.getUser(currentUser);
		Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(TODO));

		if (todo.getUser().getId().equals(user.getId())) {
			todoRepository.deleteById(id);
			return new ApiResponse(Boolean.TRUE, "You successfully deleted todo");
		}

		throw new UnauthorizedException(YOU_DON_T_HAVE_PERMISSION_TO_MAKE_THIS_OPERATION);
	}

	private void validatePageNumberAndSize(int page, int size) {
		if (page < 0) {
			throw new BadRequestException("Page number cannot be less than zero.");
		}

		if (size < 0) {
			throw new BadRequestException("Size number cannot be less than zero.");
		}

		if (size > AppConstants.MAX_PAGE_SIZE) {
			throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
		}
	}

	private TodoResponseDto fromTodoToDto(Todo todo){
		TodoResponseDto dto = modelMapper.map(todo, TodoResponseDto.class);
		dto.setUserSummary(modelMapper.map(todo.getUser(), UserSummary.class));
		return dto;
	}


}
