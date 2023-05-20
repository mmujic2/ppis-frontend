package service.desk.airport.servicedesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.ForumTopicRepository;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicCreateRequest;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicResponse;
import service.desk.airport.servicedesk.entity.ForumTopic;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class ForumTopicService {
    @Autowired
    ForumTopicRepository forumTopicRepository;

    @Autowired
    UserRepository userRepository;

    public ForumTopicResponse getForumTopicById(Integer id) throws Exception {
        return new ForumTopicResponse(forumTopicRepository.findById(id).orElseThrow(Exception::new));
    }

    public List<ForumTopicResponse> getAllForumTopics() {
        var temp = forumTopicRepository.findAll();
        temp.sort(Comparator.comparing(ForumTopic::getDateTime));
        Collections.reverse(temp);
        return temp.stream().map(ForumTopicResponse::new).toList();
    }

    public ForumTopicResponse createForumTopic(ForumTopicCreateRequest f) {
        User user = userRepository.findByEmail(f.getUserEmail()).orElseThrow();

        var forumTopic = new ForumTopic(f.getTopic(), LocalDateTime.now(), true, user);
        forumTopic = forumTopicRepository.save(forumTopic);
        return new ForumTopicResponse(forumTopic);
    }

    public ForumTopicResponse closeForumTopic(Integer id) {
        var temp = forumTopicRepository.findById(id).orElseThrow();
        temp.setOpen(false);
        return new ForumTopicResponse(forumTopicRepository.save(temp));
    }

    public String deleteForumTopic(Integer id) {
        forumTopicRepository.deleteById(id);
        return "DELETED";
    }
}




























