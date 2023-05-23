package service.desk.airport.servicedesk.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.entity.Department;
import service.desk.airport.servicedesk.security.entity.Role;
import service.desk.airport.servicedesk.security.entity.User;

@RestController
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add")
    public @ResponseBody
    String addNewUser (@RequestParam String firstname, @RequestParam String lastname, @RequestParam String email, @RequestParam String password, @RequestParam Department department, @RequestParam Role role) {
        User newuser = new User(firstname, lastname, email, password, department, role);
        userRepository.save(newuser);
        return "Added user";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }



}
