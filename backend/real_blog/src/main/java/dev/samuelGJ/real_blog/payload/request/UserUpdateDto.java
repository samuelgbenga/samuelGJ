package dev.samuelGJ.real_blog.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String phone;

    private String website;
}
