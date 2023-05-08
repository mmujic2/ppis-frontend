package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "ticket_comment")
public class TicketComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name="comment")
    private String comment;

    @Column(name="date")
    LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name="created_by")
    User createdBy;

    @ManyToOne
    @JoinColumn(name="ticket_id")
    Ticket ticket;

    public TicketComment() {
    }

    public TicketComment(String comment, LocalDateTime dateTime, User createdBy, Ticket ticket) {
        this.comment = comment;
        this.dateTime = dateTime;
        this.createdBy = createdBy;
        this.ticket = ticket;
    }

    public TicketComment(Integer id, String comment, LocalDateTime dateTime, User createdBy, Ticket ticket) {
        this.id = id;
        this.comment = comment;
        this.dateTime = dateTime;
        this.createdBy = createdBy;
        this.ticket = ticket;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }
}
