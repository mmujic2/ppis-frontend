package service.desk.airport.servicedesk.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import service.desk.airport.servicedesk.security.token.Token;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "firstname", columnDefinition = "VARCHAR(60)")
    private String firstname;

    @Column(name = "lastname", columnDefinition = "VARCHAR(60)")
    private String lastname;

    @Column(name = "email", unique = true, columnDefinition = "VARCHAR(60)")
    private String email;

    @Column(name = "password", columnDefinition = "VARCHAR(60)")
    private String password;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> userTokens;

    public User() {
    }

    public User(String firstname, String lastname, String email, String password , Department department, Role role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.department = department;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Token> getUserTokens() {
        return userTokens;
    }

    public void setUserTokens(List<Token> userTokens) {
        this.userTokens = userTokens;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // po potrebi se moze razviti da ima vise roles jedan user i onda se lista siri
        Role role = getRole();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getName()));
        return authorities;
    }

    @Override
    public String getPassword() {
        return getUserPassword();
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() { // mozemo koristiti naknadno zasad hardkodirano
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // mozemo koristiti naknadno zasad hardkodirano
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // mozemo koristiti naknadno zasad hardkodirano
        return true;
    }

    @Override
    public boolean isEnabled() { // mozemo koristiti naknadno zasad hardkodirano
        return true;
    }
}
