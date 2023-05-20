package service.desk.airport.servicedesk.dto.forumpost;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicResponse;
import service.desk.airport.servicedesk.entity.ForumTopic;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

public class ForumPostCreateRequest {

    private String content;

    private LocalDateTime dateTime;

    private String userEmail;

    private Integer forumTopicId;

    @JsonCreator
    public ForumPostCreateRequest(String content, Integer forumTopicId) {
        this.content = content;
        this.dateTime = LocalDateTime.now();
        this.userEmail = "";
        this.forumTopicId = forumTopicId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getForumTopicId() {
        return forumTopicId;
    }

    public void setForumTopicId(Integer forumTopicId) {
        this.forumTopicId = forumTopicId;
    }
}
