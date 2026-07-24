package com.cognizant.springlearn.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        if ("admin".equals(username)) {

            return User.withUsername("admin")
                    .password("$2a$10$.Ebgu3irv9z5P5ifqueKNevSB7oCsabtVi/qKHP.YYSr5JYhNfYMW")
                    .roles("ADMIN")
                    .build();
        }

        if ("user".equals(username)) {

            return User.withUsername("user")
                    .password("$2a$10$.Ebgu3irv9z5P5ifqueKNevSB7oCsabtVi/qKHP.YYSr5JYhNfYMW")
                    .roles("USER")
                    .build();
        }

        throw new UsernameNotFoundException(
                "User not found: " + username
        );
    }
}
