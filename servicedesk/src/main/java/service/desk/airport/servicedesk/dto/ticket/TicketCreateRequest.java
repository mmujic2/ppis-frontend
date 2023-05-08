package service.desk.airport.servicedesk.dto.ticket;

public class TicketCreateRequest {

    private String title;

    private String description;

    private String priorityLevel;

    private String category;

    private String tag;

    private String userEmail;

    public TicketCreateRequest(String title, String description, String priorityLevel, String category, String tag, String userEmail) {
        this.title = title;
        this.description = description;
        this.priorityLevel = priorityLevel;
        this.category = category;
        this.tag = tag;
        this.userEmail = userEmail;
    }

    public TicketCreateRequest() {
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

    public String getPriorityLevel() {
        return priorityLevel;
    }

    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
