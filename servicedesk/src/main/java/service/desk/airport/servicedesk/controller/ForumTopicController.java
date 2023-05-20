package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicCreateRequest;
import service.desk.airport.servicedesk.dto.forumtopic.ForumTopicResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.ForumTopicService;

import java.util.List;

@RestController
@RequestMapping(path="/forumtopic")
public class ForumTopicController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    ForumTopicService forumTopicService;

    @GetMapping("/all")
    public ResponseEntity<List<ForumTopicResponse>> getAllForumTopics() {
        return ResponseEntity.ok(forumTopicService.getAllForumTopics());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ForumTopicResponse> getForumTopicById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(forumTopicService.getForumTopicById(id));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ForumTopicResponse> createForumTopic(@RequestBody ForumTopicCreateRequest forumTopicCreateRequest,
                                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        var email = jwtService.extractUsername(token.substring(7));
        forumTopicCreateRequest.setUserEmail(email);

        return ResponseEntity.ok(forumTopicService.createForumTopic(forumTopicCreateRequest));
    }

    /*@PostMapping("/create")
    public String createForumTopic(@RequestBody String forumTopicCreateRequest,
                                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        System.out.println(forumTopicCreateRequest);
        return "ok";
    }*/

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteForumTopic(@PathVariable Integer id) {
        return ResponseEntity.ok(forumTopicService.deleteForumTopic(id));
    }

    @PostMapping("/close/{id}")
    public ResponseEntity<ForumTopicResponse> closeForumTopic(@PathVariable Integer id) {
        return ResponseEntity.ok(forumTopicService.closeForumTopic(id));
    }

}
