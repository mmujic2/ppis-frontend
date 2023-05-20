package service.desk.airport.servicedesk.dto.forumpost;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicResponse;
import service.desk.airport.servicedesk.entity.ForumPost;
import service.desk.airport.servicedesk.entity.ForumTopic;
import service.desk.airport.servicedesk.security.dto.UserResponse;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

public class ForumPostResponse {

    private Integer id;

    private String content;

    private LocalDateTime dateTime;

    private UserResponse createdBy;

    private ForumTopicResponse forumTopic;

    public ForumPostResponse(ForumPost forumPost) {
        this.id = forumPost.getId();
        this.content = forumPost.getContent();
        this.dateTime = forumPost.getDateTime();
        this.createdBy = new UserResponse(forumPost.getCreatedBy());
        this.forumTopic = new ForumTopicResponse(forumPost.getForumTopic());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public UserResponse getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserResponse createdBy) {
        this.createdBy = createdBy;
    }

    public ForumTopicResponse getForumTopic() {
        return forumTopic;
    }

    public void setForumTopic(ForumTopicResponse forumTopic) {
        this.forumTopic = forumTopic;
    }
}
