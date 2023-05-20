package service.desk.airport.servicedesk.dto.forumtopic;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

public class ForumTopicCreateRequest {

    private String topic;

    private LocalDateTime dateTime;

    private Boolean open;

    private String userEmail;

    @JsonCreator
    public ForumTopicCreateRequest(String topic) {
        this.topic = topic;
        this.dateTime = LocalDateTime.now();
        this.open = true;
        this.userEmail = "";
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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
