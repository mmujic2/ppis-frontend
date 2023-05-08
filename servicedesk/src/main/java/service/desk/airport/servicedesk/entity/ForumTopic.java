package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "forum_topic")
public class ForumTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "topic")
    private String topic;

    @Column(name="date")
    private LocalDateTime dateTime;

    @Column(name="open")
    private Boolean open;

    @ManyToOne
    @JoinColumn(name="created_by")
    private User createdBy;

    public ForumTopic() {
    }

    public ForumTopic(String topic, LocalDateTime dateTime, Boolean open, User createdBy) {
        this.topic = topic;
        this.dateTime = dateTime;
        this.open = open;
        this.createdBy = createdBy;
    }

    public ForumTopic(Integer id, String topic, LocalDateTime dateTime, Boolean open, User createdBy) {
        this.id = id;
        this.topic = topic;
        this.dateTime = dateTime;
        this.open = open;
        this.createdBy = createdBy;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
}
