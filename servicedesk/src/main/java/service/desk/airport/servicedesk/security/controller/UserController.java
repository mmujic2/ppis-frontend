package service.desk.airport.servicedesk.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.entity.Department;
import service.desk.airport.servicedesk.security.entity.Role;
import service.desk.airport.servicedesk.security.entity.User;

@Controller
@RequestMapping(path="/user")
public class UserController {
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