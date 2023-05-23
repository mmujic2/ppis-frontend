package service.desk.airport.servicedesk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.entity.TicketComment;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.security.entity.Department;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    @Query("SELECT t FROM Ticket t WHERE t.createdBy.id=:userId")
    public List<Ticket> findTicketsByUserId(Integer userId);

    @Query("SELECT t FROM Ticket t WHERE t.createdBy.id=:userId AND (t.status!=2) ORDER BY  t.date DESC")
    public List<Ticket> findActiveTicketsByUserId(Integer userId);

    @Query("SELECT t FROM Ticket t WHERE t.createdBy.id=:userId AND t.status=2 ORDER BY  t.date DESC")
    public List<Ticket> findProcessedTicketsByUserId(Integer userId);

    @Query("SELECT t FROM Ticket t WHERE t.createdBy.id!=:userId AND (t.status!=2) ORDER BY  t.date DESC")
    public List<Ticket> findOtherActiveTicketsByUserId(Integer userId);

    @Query("SELECT t FROM Ticket t WHERE (t.status=0 OR t.status=1) ORDER BY t.date DESC")
    public List<Ticket> findActiveTickets();

    @Query("SELECT t FROM Ticket t WHERE t.assignedTo.id=:userId AND (t.status!=2 ) ORDER BY t.date DESC")
    public List<Ticket> findAssignedTicketsForAgent(Integer userId);

    @Query("SELECT t FROM Ticket t")
    public List<Ticket> getAllTicketsHelper();

    @Query("SELECT t from Ticket t WHERE t.status=0 AND t.priorityLevel=3 ORDER BY t.date DESC")
    public List<Ticket> findUrgentUnassignedTickets();

    @Query("SELECT t FROM Ticket t WHERE t.status=0 ORDER BY t.date DESC")
    public List<Ticket> getOpenTicketsForAgent(Integer userId);

    @Query("SELECT t FROM Ticket t WHERE t.assignedTo.id=:userId AND (t.status=2 ) ORDER BY t.date DESC")
    public List<Ticket> findClosedTicketsForAgent(Integer userId);

    @Query("SELECT t FROM Ticket t WHERE t.code=:code")
    public Ticket findByCode(String code);

}
