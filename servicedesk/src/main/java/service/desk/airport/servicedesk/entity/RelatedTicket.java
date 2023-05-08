package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.security.entity.User;

@Entity
@Table(name = "related_ticket")
public class RelatedTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ticket_A")
    private Ticket ticketA;

    @ManyToOne
    @JoinColumn(name = "ticket_B")
    private Ticket ticketB;

    public RelatedTicket() {
    }

    public RelatedTicket(Integer id, Ticket ticketA, Ticket ticketB) {
        this.id = id;
        this.ticketA = ticketA;
        this.ticketB = ticketB;
    }

    public RelatedTicket(Ticket ticketA, Ticket ticketB) {
        this.ticketA = ticketA;
        this.ticketB = ticketB;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Ticket getTicketA() {
        return ticketA;
    }

    public void setTicketA(Ticket ticketA) {
        this.ticketA = ticketA;
    }

    public Ticket getTicketB() {
        return ticketB;
    }

    public void setTicketB(Ticket ticketB) {
        this.ticketB = ticketB;
    }
}
