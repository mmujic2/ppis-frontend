package service.desk.airport.servicedesk.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.security.dao.RoleRepository;
import service.desk.airport.servicedesk.security.entity.Role;

@Controller
@RequestMapping(path="/role")
public class RoleController {
    @Autowired
    private RoleRepository roleRepository;

    @PostMapping(path="/add")
    public @ResponseBody
    String addNewRole (@RequestParam String name) {
        Role newrole = new Role(name);
        roleRepository.save(newrole);
        return "Added role";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
