package service.desk.airport.servicedesk.security.dto;

import service.desk.airport.servicedesk.security.entity.User;

public class AuthResponse {
    private String token;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String department;

    public AuthResponse() {
    }

    public AuthResponse(String token, User user) {
        this.token = token;
        this.firstName = user.getFirstname();
        this.lastName = user.getLastname();
        this.role = user.getRole().getName();
        this.department = user.getDepartment().getName();
        this.email= user.getEmail();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
