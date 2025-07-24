package dev.samuelGJ.real_blog.service.impl;

import dev.samuelGJ.real_blog.exception.ResourceNotFoundException;
import dev.samuelGJ.real_blog.exception.UnauthorizedException;
import dev.samuelGJ.real_blog.model.Certification;
import dev.samuelGJ.real_blog.model.Photo;
import dev.samuelGJ.real_blog.model.user.User;
import dev.samuelGJ.real_blog.payload.request.CertificationRequestDto;
import dev.samuelGJ.real_blog.payload.request.CertificationUpdateRequest;
import dev.samuelGJ.real_blog.payload.response.ApiResponse;
import dev.samuelGJ.real_blog.payload.response.CertificationResponseDto;
import dev.samuelGJ.real_blog.payload.response.PagedResponse;
import dev.samuelGJ.real_blog.payload.response.PhotoResponse;
import dev.samuelGJ.real_blog.repository.CertificationRepository;
import dev.samuelGJ.real_blog.repository.UserRepository;
import dev.samuelGJ.real_blog.security.UserPrincipal;
import dev.samuelGJ.real_blog.service.CertificationService;
import dev.samuelGJ.real_blog.service.CloudinaryService;
import dev.samuelGJ.real_blog.service.PhotoService;
import dev.samuelGJ.real_blog.utils.EntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CertificationServiceImpl implements CertificationService {

    private final CertificationRepository certificationRepository;
    private final UserRepository userRepository;
    private final PhotoService photoService;

    @Override
    public CertificationResponseDto save(UserPrincipal currentUser, CertificationRequestDto request) {
        User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Certification certification = EntityMapper.dtoToEntity(request);
        certification.setUser(user);
        
        // Handle file upload
        Photo photo = photoService.addPhoto(request.multipartFile());
        certification.setCredentialUrl(photo.getUrl());
        
        return EntityMapper.entityToDto(certificationRepository.save(certification));
    }

    @Override
    public CertificationResponseDto get(UserPrincipal currentUser, Long id) {
        Certification certification = certificationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Certification not found"));
        return EntityMapper.entityToDto(certification);
    }

    @Override
    public PagedResponse<CertificationResponseDto> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Certification> certifications = certificationRepository.findAll(pageable);
        return new PagedResponse<>(certifications.getContent().stream()
            .map(EntityMapper::entityToDto)
            .toList(), certifications.getNumber(), certifications.getSize(), 
            certifications.getTotalElements(), certifications.getTotalPages(), certifications.isLast());
    }

    @Override
    public CertificationResponseDto update(UserPrincipal currentUser, Long id, CertificationUpdateRequest request) {
        Certification certification = certificationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Certification not found"));
        
        if (!certification.getCreatedBy().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to update this certification");
        }

        certification.setName(request.name());
        certification.setIssuer(request.issuer());
        certification.setIssueDate(request.issueDate());
        certification.setExpireDate(request.expireDate());
        certification.setDescription(request.description());
        // Photo photo =  photoService.addPhoto(request.multipartFile());
        // certification.setCredentialUrl(photo.getUrl());

        return EntityMapper.entityToDto(certificationRepository.save(certification));
    }

    @Override
    public ApiResponse delete(UserPrincipal currentUser, Long id) {
        Certification certification = certificationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Certification not found"));
        
        if (!certification.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't have permission to delete this certification");
        }

        certificationRepository.delete(certification);
        return new ApiResponse(true, "Certification deleted successfully");
    }
}
