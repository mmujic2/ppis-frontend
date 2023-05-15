package service.desk.airport.servicedesk.dto.manual;

import service.desk.airport.servicedesk.entity.Manual;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.security.dto.UserResponse;

import java.time.LocalDateTime;

public class ManualResponse {
    private Integer id;
    private String title;
    private String content;
    private Category category;
    private UserResponse createdBy;
    private LocalDateTime dateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public UserResponse getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserResponse createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public ManualResponse() {
    }

    public ManualResponse(Integer id, String title, String content, Category category, UserResponse createdBy, LocalDateTime dateTime) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.createdBy = createdBy;
        this.dateTime = dateTime;
    }

    public ManualResponse(Manual manual) {
        id = manual.getId();
        category = manual.getCategory();
        title = manual.getTitle();
        content = manual.getContent();
        createdBy = new UserResponse(manual.getCreatedBy());
        dateTime = manual.getDateTime();
    }
}
