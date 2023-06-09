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

    public Report() {
    }

    public Report(Integer id, TicketTag tag, String department, LocalDateTime reportDate, LocalDateTime dateTimeRequested, String code, PriorityLevel priorityLevel, Boolean slaBreached, String duration, String description, String businessImpact, String correctiveActions, User raisedBy, User resolvedBy) {
        this.id = id;
        this.tag = tag;
        this.department = department;
        this.reportDate = reportDate;
        this.dateTimeRequested = dateTimeRequested;
        this.code = code;
        this.priorityLevel = priorityLevel;
        this.slaBreached = slaBreached;
        this.duration = duration;
        this.description = description;
        this.businessImpact = businessImpact;
        this.correctiveActions = correctiveActions;
        this.raisedBy = raisedBy;
        this.resolvedBy = resolvedBy;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TicketTag getTag() {
        return tag;
    }

    public void setTag(TicketTag tag) {
        this.tag = tag;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }

    public LocalDateTime getDateTimeRequested() {
        return dateTimeRequested;
    }

    public void setDateTimeRequested(LocalDateTime dateTimeRequested) {
        this.dateTimeRequested = dateTimeRequested;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public PriorityLevel getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(PriorityLevel priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public Boolean getSlaBreached() {
        return slaBreached;
    }

    public void setSlaBreached(Boolean slaBreached) {
        this.slaBreached = slaBreached;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBusinessImpact() {
        return businessImpact;
    }

    public void setBusinessImpact(String businessImpact) {
        this.businessImpact = businessImpact;
    }

    public String getCorrectiveActions() {
        return correctiveActions;
    }

    public void setCorrectiveActions(String correctiveActions) {
        this.correctiveActions = correctiveActions;
    }

    public User getRaisedBy() {
        return raisedBy;
    }

    public void setRaisedBy(User raisedBy) {
        this.raisedBy = raisedBy;
    }

    public User getResolvedBy() {
        return resolvedBy;
    }

    public void setResolvedBy(User resolvedBy) {
        this.resolvedBy = resolvedBy;
    }
}
