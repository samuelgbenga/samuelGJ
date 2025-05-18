package dev.samuelGJ.real_blog.service.impl;


import dev.samuelGJ.real_blog.exception.BlogApiException;
import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.model.Comment;
import dev.samuelGJ.real_blog.model.Post;
import dev.samuelGJ.real_blog.model.role.RoleName;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.UserSummary;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.request.CommentRequest;
import dev.samuelGJ.real_blog.payload.response.CommentResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.repository.CommentRepository;
import dev.samuelGJ.real_blog.repository.PostRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CommentService;
import dev.samuelGJ.real_blog.utils.AppUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	private static final String THIS_COMMENT = " this comment";

	private static final String YOU_DON_T_HAVE_PERMISSION_TO = "You don't have permission to ";

	private static final String ID_STR = "id";

	private static final String COMMENT_STR = "Comment";

	private static final String POST_STR = "Post";

	private static final String COMMENT_DOES_NOT_BELONG_TO_POST = "Comment does not belong to post";


	private final CommentRepository commentRepository;


	private final PostRepository postRepository;


	private final UserRepository userRepository;

	private final ModelMapper modelMapper;

	@Override
	public PagedResponse<CommentResponseDto> getAllComments(Long postId, int page, int size) {
		AppUtils.validatePageNumberAndSize(page, size);
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");

		Page<Comment> comments = commentRepository.findByPostId(postId, pageable);
		List<CommentResponseDto> thread = buildCommentTree(comments.getContent());

		return new PagedResponse<>(thread, comments.getNumber(), comments.getSize(),
				comments.getTotalElements(), comments.getTotalPages(), comments.isLast());
	}

	@Override
	public CommentResponseDto addComment(CommentRequest commentRequest, Long postId, UserPrincipal currentUser) {


		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new EntityNotFoundException("Post not found"));
		User user = userRepository.findById(currentUser.getId())
				.orElseThrow(() -> new EntityNotFoundException("User not found"));

		Comment comment = new Comment();
		comment.setPost(post);
		comment.setUser(user);
		comment.setBody(commentRequest.getBody());

		if (commentRequest.getParentId() != null) {
			Comment parent = commentRepository.findById(commentRequest.getParentId())
					.orElseThrow(() -> new EntityNotFoundException("Parent comment not found"));
			comment.setParent(parent);
			comment.setDepth(parent.getDepth() + 1);
			comment.setPath("");
			comment = commentRepository.save(comment); // Save first to get ID
			comment.setPath(parent.getPath() + "/" + comment.getId());
		} else {
			comment.setDepth(0);
			comment.setPath("");
			comment = commentRepository.save(comment);
			comment.setPath(comment.getId().toString());
		}

		CommentResponseDto dto = fromCommentToDto(commentRepository.save(comment));

		return dto;

	}

	@Override
	public List<CommentResponseDto> getComment(Long postId, Long id) {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException(POST_STR));
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(COMMENT_STR));
		if (comment.getPost().getId().equals(post.getId())) {
			List<Comment> flatComments = commentRepository.findByPathStartingWith(comment.getPath());
			List<CommentResponseDto> thread = buildCommentTree(flatComments);
			return thread;
		}

		throw new BlogApiException( COMMENT_DOES_NOT_BELONG_TO_POST);
	}

	@Override
	public Comment updateComment(Long postId, Long id, CommentRequest commentRequest,
			UserPrincipal currentUser) {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException(POST_STR));
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(COMMENT_STR));

		if (!comment.getPost().getId().equals(post.getId())) {
			throw new BlogApiException( COMMENT_DOES_NOT_BELONG_TO_POST);
		}

		if (comment.getUser().getId().equals(currentUser.getId())
				|| currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			comment.setBody(commentRequest.getBody());
			return commentRepository.save(comment);
		}

		throw new BlogApiException( YOU_DON_T_HAVE_PERMISSION_TO + "update" + THIS_COMMENT);
	}

	@Override
	public ApiResponse deleteComment(Long postId, Long id, UserPrincipal currentUser) {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException(POST_STR));
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(COMMENT_STR));

		if (!comment.getPost().getId().equals(post.getId())) {
			return new ApiResponse(Boolean.FALSE, COMMENT_DOES_NOT_BELONG_TO_POST);
		}

		if (comment.getUser().getId().equals(currentUser.getId())
				|| currentUser.getAuthorities().contains(new SimpleGrantedAuthority(RoleName.ROLE_ADMIN.toString()))) {
			commentRepository.deleteById(comment.getId());
			return new ApiResponse(Boolean.TRUE, "You successfully deleted comment");
		}

		throw new BlogApiException( YOU_DON_T_HAVE_PERMISSION_TO + "delete" + THIS_COMMENT);
	}


	private List<CommentResponseDto> buildCommentTree(List<Comment> comments) {
		Map<Long, CommentResponseDto> map = new HashMap<>();
		List<CommentResponseDto> roots = new ArrayList<>();

		for (Comment c : comments) {
			CommentResponseDto dto = fromCommentToDto(c);
			map.put(dto.getId(), dto);
		}

		for (Comment c : comments) {
			CommentResponseDto dto = map.get(c.getId());
			if (c.getParent() != null && map.containsKey(c.getParent().getId())) {
				map.get(c.getParent().getId()).getReplies().add(dto);
			} else {
				roots.add(dto);
			}
		}

		return roots;
	}

	private CommentResponseDto fromCommentToDto(Comment comment) {
		CommentResponseDto dto = modelMapper.map(comment, CommentResponseDto.class);
		dto.setUserSummary(modelMapper.map(comment.getUser(), UserSummary.class));
		return dto;
	}

}


