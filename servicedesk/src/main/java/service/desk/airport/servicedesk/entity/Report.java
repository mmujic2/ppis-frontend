package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "tag")
    private TicketTag tag;

    @Column(name = "department")
    private String department;

    @Column(name="report_date")
    private LocalDateTime reportDate;

    @Column(name="datetime_requested")
    private LocalDateTime dateTimeRequested;

    @Column(name="code", unique = true)
    private String code;

    @Column(name="priority")
    private PriorityLevel priorityLevel;

    @Column(name="sla_breached")
    private Boolean slaBreached;

    @Column(name="duration")
    private String duration;

    @Column(name="description")
    private String description;

    @Column(name="business_impact")
    private String businessImpact;

    @Column(name="corrective_actions")
    private String correctiveActions;

    @ManyToOne
    @JoinColumn(name = "raised_by")
    private User raisedBy;

    @ManyToOne
    @JoinColumn(name = "resolved_by")
    private User resolvedBy;

}
