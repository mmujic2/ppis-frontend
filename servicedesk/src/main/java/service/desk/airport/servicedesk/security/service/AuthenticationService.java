package service.desk.airport.servicedesk.security.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.security.dao.DepartmentRepository;
import service.desk.airport.servicedesk.security.dao.RoleRepository;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.dto.AuthCredentials;
import service.desk.airport.servicedesk.security.dto.AuthResponse;
import service.desk.airport.servicedesk.security.dto.RegisterRequest;
import service.desk.airport.servicedesk.security.entity.User;
import service.desk.airport.servicedesk.security.token.Token;
import service.desk.airport.servicedesk.security.token.TokenRepository;
import service.desk.airport.servicedesk.security.token.TokenType;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Service
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final DepartmentRepository departmentRepository;
    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final TokenRepository tokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, DepartmentRepository departmentRepository, RoleRepository roleRepository, TokenRepository tokenRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public User getUserByEmail(String email) {
        var user = userRepository.findByEmail(email);

        if(user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        var role = roleRepository.findById(registerRequest.getRoleId()).get();
        var user = new User(registerRequest.getFirstname(),
                registerRequest.getLastname(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                departmentRepository.findById(registerRequest.getDepartmentId()).get(),
                role);

        var savedUser = userRepository.save(user);
        Map<String,Object> roleMap= new HashMap<>();
        roleMap.put("Role",role.getName());
        var jwtToken = jwtService.generateToken(roleMap,user);
        var refreshToken = jwtService.generateRefreshToken(roleMap, user);
        saveToken(savedUser, jwtToken);
        return  new AuthResponse(jwtToken,refreshToken,savedUser);
    }

    private void saveToken(User savedUser, String jwtToken) {
        var token = new Token(jwtToken, TokenType.BEARER,false,false, savedUser);
        tokenRepository.save(token);
    }

    public AuthResponse authenticate(AuthCredentials authRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()));
        var user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow();
        var role = user.getRole();
        Map<String,Object> roleMap= new HashMap<>();
        roleMap.put("Role",role.getName());
        var jwtToken = jwtService.generateToken(roleMap,user);
        var refreshToken = jwtService.generateRefreshToken(roleMap,user);
        revokeAllUserTokens(user);
        saveToken(user, jwtToken);
        return  new AuthResponse(jwtToken,refreshToken,user);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String userEmail;
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if(userEmail!=null) {
            var userDetails = this.userRepository.findByEmail(userEmail).orElseThrow();
            var role = userDetails.getRole();
            Map<String,Object> roleMap= new HashMap<>();
            roleMap.put("Role",role.getName());
            if(jwtService.isTokenValid(refreshToken,userDetails)) {
                var accessToken = jwtService.generateToken(roleMap,userDetails);
                revokeAllUserTokens(userDetails);
                saveToken(userDetails, accessToken);
                var authResponse = new AuthResponse(accessToken,refreshToken,userDetails);
                return authResponse;
            }
        }

        return null;
    }
}
