package service.desk.airport.servicedesk.dto.forumtopic;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.entity.ForumTopic;
import service.desk.airport.servicedesk.security.dto.UserResponse;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

public class ForumTopicResponse {

    private Integer id;

    private String topic;

    private LocalDateTime dateTime;

    private Boolean open;

    private UserResponse createdBy;

    public ForumTopicResponse(ForumTopic forumTopic) {
        this.id = forumTopic.getId();
        this.topic = forumTopic.getTopic();
        this.dateTime = forumTopic.getDateTime();
        this.open = forumTopic.getOpen();
        this.createdBy = new UserResponse(forumTopic.getCreatedBy());
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public UserResponse getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserResponse createdBy) {
        this.createdBy = createdBy;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
