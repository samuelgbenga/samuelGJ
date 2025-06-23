package dev.samuelGJ.real_blog.payload.request;

import java.time.LocalDate;

public record CertificationUpdateRequest(

    String name,
    

    String issuer,
    
  
    String description,
    
    
    LocalDate issueDate,
    
    
    LocalDate expireDate
    
   
) {
} 