package service.desk.airport.servicedesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.TicketCommentRepository;
import service.desk.airport.servicedesk.dao.TicketRepository;
import service.desk.airport.servicedesk.dto.ticketcomment.TicketCommentCreateRequest;
import service.desk.airport.servicedesk.dto.ticketcomment.TicketCommentResponse;
import service.desk.airport.servicedesk.entity.TicketComment;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.dto.UserResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketCommentService {
    @Autowired
    TicketCommentRepository ticketCommentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TicketRepository ticketRepository;

    public List<TicketCommentResponse> getTicketComments(Integer ticketId) {
       return ticketCommentRepository
               .findTicketCommentsByTicketId(ticketId)
               .stream()
               .map(tc -> new TicketCommentResponse(tc))
               .collect(Collectors.toList());
    }

    public TicketCommentResponse createTicketComment(TicketCommentCreateRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail()).orElseThrow();
        var ticket = ticketRepository.findById(request.getTicketId()).orElseThrow();

        var ticketComment = new TicketComment();
        ticketComment.setComment(request.getComment());
        ticketComment.setCreatedBy(user);
        ticketComment.setTicket(ticket);
        ticketComment.setDateTime(LocalDateTime.now());

        ticketComment = ticketCommentRepository.save(ticketComment);
        return new TicketCommentResponse(ticketComment);
    }
}
