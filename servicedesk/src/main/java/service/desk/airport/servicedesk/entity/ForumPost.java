package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "forum_post")
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "content")
    private String content;

    @Column(name="date")
    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name="created_by")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name="topic_id")
    private ForumTopic forumTopic;


    public ForumPost() {
    }

    public ForumPost(String content, LocalDateTime dateTime, User createdBy, ForumTopic forumTopic) {
        this.content = content;
        this.dateTime = dateTime;
        this.createdBy = createdBy;
        this.forumTopic = forumTopic;
    }

    public ForumPost(Integer id, String content, LocalDateTime dateTime, User createdBy, ForumTopic forumTopic) {
        this.id = id;
        this.content = content;
        this.dateTime = dateTime;
        this.createdBy = createdBy;
        this.forumTopic = forumTopic;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public ForumTopic getForumTopic() {
        return forumTopic;
    }

    public void setForumTopic(ForumTopic forumTopic) {
        this.forumTopic = forumTopic;
    }
}
