package service.desk.airport.servicedesk.security.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.security.entity.Department;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Integer> {
}
