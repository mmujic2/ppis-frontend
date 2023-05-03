package service.desk.airport.servicedesk.security.authorization;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import service.desk.airport.servicedesk.security.entity.Role;
import service.desk.airport.servicedesk.security.entity.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AirportUserDetails implements UserDetails {

    private User user;

    public AirportUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // po potrebi se moze razviti da ima vise roles jedan user i onda se lista siri
        Role role = user.getRole();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.getName()));
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
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
