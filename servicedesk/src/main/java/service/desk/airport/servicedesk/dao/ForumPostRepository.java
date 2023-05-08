package service.desk.airport.servicedesk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.ForumPost;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost,Integer> {
}
