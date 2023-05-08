package service.desk.airport.servicedesk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.TicketComment;

import java.util.List;

@Repository
public interface TicketCommentRepository extends JpaRepository<TicketComment,Integer> {

    @Query("SELECT tc FROM TicketComment tc WHERE tc.ticket.id=:ticketId ORDER BY tc.dateTime DESC")
    public List<TicketComment> findTicketCommentsByTicketId(Integer ticketId);
}
