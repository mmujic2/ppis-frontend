package service.desk.airport.servicedesk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.ForumPost;
import service.desk.airport.servicedesk.entity.Ticket;

import java.util.List;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost,Integer> {

    @Query("SELECT t FROM ForumPost t WHERE t.forumTopic.id=:topicId ORDER BY t.dateTime DESC")
    public List<ForumPost> findPostByTopicId(Integer topicId);
}
