package service.desk.airport.servicedesk.dto.ticket;

import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;

public class FilterRequest {

    private String userEmail;
    private String ticketType;
    private Category category = null;
    private PriorityLevel priorityLevel = null;
    private String sorting = "descending";

    public FilterRequest(String userEmail, String ticketType, Category category, PriorityLevel priorityLevel, String sorting) {
        this.userEmail = userEmail;
        this.ticketType = ticketType;
        this.category = category;
        this.priorityLevel = priorityLevel;
        this.sorting = sorting;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public PriorityLevel getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(PriorityLevel priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public String getSorting() {
        return sorting;
    }

    public void setSorting(String sorting) {
        this.sorting = sorting;
    }
}
