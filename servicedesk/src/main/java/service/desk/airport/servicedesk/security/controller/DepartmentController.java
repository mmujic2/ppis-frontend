package service.desk.airport.servicedesk.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.security.dao.DepartmentRepository;
import service.desk.airport.servicedesk.security.entity.Department;


@Controller
@RequestMapping(path="/department")
public class DepartmentController {
    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping(path="/add")
    public @ResponseBody
    String addNewDepartment (@RequestParam String name) {
        Department newdepartment = new Department(name);
        departmentRepository.save(newdepartment);
        return "Added department";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
