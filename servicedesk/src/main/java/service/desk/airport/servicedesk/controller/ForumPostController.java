package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.forumpost.ForumPostCreateRequest;
import service.desk.airport.servicedesk.dto.forumpost.ForumPostResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.ForumPostService;

import java.util.List;

@RestController
@RequestMapping(path="/forumpost")
public class ForumPostController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    ForumPostService forumPostService;

    @GetMapping("/all")
    public ResponseEntity<List<ForumPostResponse>> getAllForumPosts() {
        return ResponseEntity.ok(forumPostService.getAllForumPosts());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<ForumPostResponse>> getForumPostsByTopicId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(forumPostService.getPostsByForumTopicId(id));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ForumPostResponse> createForumPost(@RequestBody ForumPostCreateRequest forumPostCreateRequest,
                                                             @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        var email = jwtService.extractUsername(token.substring(7));
        forumPostCreateRequest.setUserEmail(email);

        return ResponseEntity.ok(forumPostService.createForumPost(forumPostCreateRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteForumPost(@PathVariable Integer id) {
        return ResponseEntity.ok(forumPostService.deleteForumPost(id));
    }
}
