package service.desk.airport.servicedesk.entity;

import jakarta.persistence.*;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.security.entity.User;

import java.net.UnknownServiceException;
import java.time.LocalDateTime;

@Entity
@Table(name = "manual")
public class Manual {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title", columnDefinition = "VARCHAR(60)")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "category")
    private Category category;

    @Column(name = "date")
    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;


    public Manual() {
    }

    public Manual(Integer id, String title, String content, Category category, LocalDateTime dateTime, User createdBy) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.dateTime = dateTime;
        this.createdBy = createdBy;
    }

    public Manual(String title, String content, Category category, LocalDateTime dateTime, User createdBy) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.dateTime = dateTime;
        this.createdBy = createdBy;
    }

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
}
