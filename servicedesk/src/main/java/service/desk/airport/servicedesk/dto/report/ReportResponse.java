package service.desk.airport.servicedesk.dto.report;

import service.desk.airport.servicedesk.entity.Report;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.dto.UserResponse;

import java.time.LocalDateTime;

public class ReportResponse {

    private Integer id;
    private TicketTag tag;
    private String department;

    private LocalDateTime reportDate;

    private LocalDateTime dateTimeRequested;

    private String code;

    private PriorityLevel priorityLevel;

    private Boolean slaBreached;

    private String duration;

    private String description;

    private String businessImpact;

    private String correctiveActions;

    private UserResponse raisedBy;

    private UserResponse resolvedBy;

    public ReportResponse(Report report) {
        id = report.getId();
        tag = report.getTag();
        code = report.getCode();
        slaBreached = report.getSlaBreached();
        department = report.getDepartment();
        description = report.getDescription();
        businessImpact = report.getBusinessImpact();
        correctiveActions = report.getCorrectiveActions();
        duration = report.getDuration();
        reportDate = report.getReportDate();
        dateTimeRequested = report.getDateTimeRequested();
        priorityLevel = report.getPriorityLevel();
        raisedBy = new UserResponse(report.getRaisedBy());
        resolvedBy = new UserResponse(report.getResolvedBy());
    }
    public ReportResponse() {
    }

    public ReportResponse(Integer id, TicketTag tag, String department, LocalDateTime reportDate, LocalDateTime dateTimeRequested, String code, PriorityLevel priorityLevel, Boolean slaBreached, String duration, String description, String businessImpact, String correctiveActions, UserResponse raisedBy, UserResponse resolvedBy) {
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

    public UserResponse getRaisedBy() {
        return raisedBy;
    }

    public void setRaisedBy(UserResponse raisedBy) {
        this.raisedBy = raisedBy;
    }

    public UserResponse getResolvedBy() {
        return resolvedBy;
    }

    public void setResolvedBy(UserResponse resolvedBy) {
        this.resolvedBy = resolvedBy;
    }
}
