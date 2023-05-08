package service.desk.airport.servicedesk.security.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.security.dto.AuthCredentials;
import service.desk.airport.servicedesk.security.dto.AuthResponse;
import service.desk.airport.servicedesk.security.dto.RegisterRequest;
import service.desk.airport.servicedesk.security.entity.User;
import service.desk.airport.servicedesk.security.service.AuthenticationService;

import java.io.IOException;

@RestController
@RequestMapping(path="/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        var user = authenticationService.getUserByEmail(email);
        if(user == null)
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);

        return  ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {

       return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthCredentials credentials) {

        return ResponseEntity.ok(authenticationService.authenticate(credentials));

    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
        try {
            return ResponseEntity.ok(authenticationService.refreshToken(request,response));
        } catch (IOException e) {
            logger.error("Failed to refresh token");
            return (ResponseEntity<AuthResponse>) ResponseEntity.badRequest();
        }
    }

}
