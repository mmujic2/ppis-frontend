package service.desk.airport.servicedesk.dto.report;



import java.time.LocalDateTime;

public class ReportCreateRequest {
    private String tag;

    private String department;

    private LocalDateTime dateTimeRequested;

    private String code;

    private String priorityLevel;

    private Boolean slaBreached;


    private String duration;


    private String description;


    private String businessImpact;


    private String correctiveActions;

    private Integer raisedById;


    private String resolvedByEmail;

    public ReportCreateRequest() {
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(String priorityLevel) {
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

    public Integer getRaisedById() {
        return raisedById;
    }

    public void setRaisedById(Integer raisedById) {
        this.raisedById = raisedById;
    }

    public String getResolvedByEmail() {
        return resolvedByEmail;
    }

    public void setResolvedByEmail(String resolvedByEmail) {
        this.resolvedByEmail = resolvedByEmail;
    }

    public ReportCreateRequest(String tag, String department, LocalDateTime dateTimeRequested, String code, String priorityLevel, Boolean slaBreached, String duration, String description, String businessImpact, String correctiveActions, Integer raisedById, String resolvedByEmail) {
        this.tag = tag;
        this.department = department;
        this.dateTimeRequested = dateTimeRequested;
        this.code = code;
        this.priorityLevel = priorityLevel;
        this.slaBreached = slaBreached;
        this.duration = duration;
        this.description = description;
        this.businessImpact = businessImpact;
        this.correctiveActions = correctiveActions;
        this.raisedById = raisedById;
        this.resolvedByEmail = resolvedByEmail;
    }
}
