package service.desk.airport.servicedesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.ForumPostRepository;
import service.desk.airport.servicedesk.dao.ForumTopicRepository;
import service.desk.airport.servicedesk.dto.forumpost.ForumPostCreateRequest;
import service.desk.airport.servicedesk.dto.forumpost.ForumPostResponse;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicResponse;
import service.desk.airport.servicedesk.entity.ForumPost;
import service.desk.airport.servicedesk.entity.ForumTopic;
import service.desk.airport.servicedesk.security.dao.UserRepository;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class ForumPostService {
    @Autowired
    private ForumPostRepository forumPostRepository;

    @Autowired
    private ForumTopicRepository forumTopicRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ForumPostResponse> getAllForumPosts() {
        var temp = forumPostRepository.findAll();
        temp.sort(Comparator.comparing(ForumPost::getDateTime));
        return temp.stream().map(ForumPostResponse::new).toList();
    }

    public List<ForumPostResponse> getPostsByForumTopicId(Integer forumTopicId) {
        return forumPostRepository.findPostByTopicId(forumTopicId).stream().map(ForumPostResponse::new).toList();
    }

    public ForumPostResponse createForumPost(ForumPostCreateRequest forumPostCreateRequest) {
        var user = userRepository.findByEmail(forumPostCreateRequest.getUserEmail()).orElseThrow();
        var forumTopic = forumTopicRepository.findById(forumPostCreateRequest.getForumTopicId()).orElseThrow();

        var forumPost = new ForumPost(forumPostCreateRequest.getContent(), LocalDateTime.now(), user, forumTopic);
        forumPostRepository.save(forumPost);

        return new ForumPostResponse(forumPost);
    }

    public String deleteForumPost(Integer id) {
        forumPostRepository.deleteById(id);
        return "DELETED";
    }
}






















