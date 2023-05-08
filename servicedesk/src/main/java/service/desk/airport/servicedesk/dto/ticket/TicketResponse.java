package service.desk.airport.servicedesk.dto.ticket;

import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketStatus;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.dto.UserResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TicketResponse {
    private Integer id;

    private String code;

    private String title;
    private String description;

    TicketStatus status;

    PriorityLevel priorityLevel;
    Category category;

    private TicketTag tag;

    private LocalDateTime date;

    private UserResponse assignedTo;

    private UserResponse createdBy;

    private List<Integer> relatedTicketIds;


    public TicketResponse(Ticket t) {

        this.id = t.getId();
        this.code = t.getCode();
        this.title =t.getTitle();
        this.description = t.getDescription();
        this.status = t.getStatus();
        this.priorityLevel = t.getPriorityLevel();
        this.category = t.getCategory();
        this.tag = t.getTag();
        this.date = t.getDate();

        this.createdBy =  new UserResponse(t.getCreatedBy());
        if(t.getAssignedTo()!=null)
            this.assignedTo = new UserResponse(t.getAssignedTo());
    }

    public TicketResponse(Ticket t, boolean stopRecursion) {
        this.id = t.getId();
        this.code = t.getCode();
        this.title =t.getTitle();
        this.description = t.getDescription();
        this.status = t.getStatus();
        this.priorityLevel = t.getPriorityLevel();
        this.category = t.getCategory();
        this.tag = t.getTag();
        this.date = t.getDate();

        if(!stopRecursion) {
            this.relatedTicketIds = new ArrayList<>();
            for(var x : t.getRelatedTickets()) {
                this.relatedTicketIds.add(x.getId());
            }
        }


        this.createdBy =  new UserResponse(t.getCreatedBy());
        if(t.getAssignedTo()!=null)
            this.assignedTo = new UserResponse(t.getAssignedTo());
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public PriorityLevel getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(PriorityLevel priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public TicketTag getTag() {
        return tag;
    }

    public void setTag(TicketTag tag) {
        this.tag = tag;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public UserResponse getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(UserResponse assignedTo) {
        this.assignedTo = assignedTo;
    }

    public UserResponse getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserResponse createdBy) {
        this.createdBy = createdBy;
    }

    public List<Integer> getRelatedTicketIds() {
        return relatedTicketIds;
    }

    public void setRelatedTicketIds(List<Integer> relatedTicketIds) {
        this.relatedTicketIds = relatedTicketIds;
    }
}
