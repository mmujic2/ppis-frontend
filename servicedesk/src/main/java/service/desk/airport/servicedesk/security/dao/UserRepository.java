package service.desk.airport.servicedesk.security.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.security.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);


    @Query("SELECT u FROM User u WHERE u.department.id=:department_id ORDER BY (" +
            "SELECT COUNT(t.assignedTo) FROM User u2 LEFT JOIN Ticket t ON u2.id=t.assignedTo.id WHERE u2.id = u.id) ASC  LIMIT 1")
    public User findUserInSpecificDepartment(Integer department_id);

}
