package service.desk.airport.servicedesk.service;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;
import service.desk.airport.servicedesk.dao.TicketRepository;
import service.desk.airport.servicedesk.dto.ticket.FilterRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketFilterRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.dto.ticketcomment.TicketCommentResponse;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketStatus;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.entity.User;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;
    @Autowired
    UserRepository userRepository;

    public Ticket getTicket(Integer ticketId) {
        return ticketRepository.findById(ticketId).orElseThrow();
    }
    public Ticket getTicketByCode(String code) {
        return ticketRepository.findByCode(code);
    }
    public TicketResponse createTicket(TicketCreateRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail()).orElseThrow();
        var tag = TicketTag.valueOf(request.getTag());
        var priority = PriorityLevel.valueOf(request.getPriorityLevel());
        var category = Category.valueOf(request.getCategory());
        var code = "T-" + request.getTag().charAt(0) + "- " +  UUID.randomUUID().toString();
        var status = TicketStatus.ACTIVE;
        var date = LocalDateTime.now();

        var ticket = new Ticket(code,request.getTitle(),request.getDescription(),status,priority,category,tag,date,user);
        ticket = ticketRepository.save(ticket);
        ticket.setCode("T-" + request.getTag().charAt(0) + "-" + ticket.getId());
        ticket = ticketRepository.save(ticket);
        return new TicketResponse(ticket);
    }

    public List<TicketResponse>  getActiveTicketsForUser(String userEmail) {
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        return ticketRepository
                .findActiveTicketsByUserId(user.getId())
                .stream()
                .map(t -> new TicketResponse(t))
                .collect(Collectors.toList());
    }

    public List<TicketResponse>  getProcessedTicketsForUser(String userEmail) {
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        return ticketRepository
                .findProcessedTicketsByUserId(user.getId())
                .stream()
                .map(t -> new TicketResponse(t))
                .collect(Collectors.toList());
    }

    public List<TicketResponse>  getOtherTicketsForUser(String userEmail) {
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        return ticketRepository
                .findOtherActiveTicketsByUserId(user.getId())
                .stream()
                .map(t -> new TicketResponse(t))
                .collect(Collectors.toList());
    }


    public TicketResponse assignTicket( String userEmail, Integer ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();

        //Someone has already taken the ticket
        if(ticket.getStatus().equals(TicketStatus.ASSIGNED))
            return null;

        ticket.setStatus(TicketStatus.ASSIGNED);
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        ticket.setAssignedTo(user);
        ticketRepository.save(ticket);
        return  new TicketResponse(ticket);
    }

    public TicketResponse verifyTicket( Integer ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        if(ticket.getStatus() != TicketStatus.ASSIGNED)
            return null;
        ticket.setStatus(TicketStatus.VERIFIED);
        ticketRepository.save(ticket);
        return  new TicketResponse(ticket);
    }
    public TicketResponse closeTicket( Integer ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        if (ticket.getStatus() != TicketStatus.VERIFIED){
            var exception = new EntityNotFoundException("Closing a ticket is only possible if its status is VERIFIED");
            throw exception;
        }
        ticket.setStatus(TicketStatus.CLOSED);
        ticketRepository.save(ticket);
        return  new TicketResponse(ticket);
    }

    public String deleteTicket(Integer ticketId) {
        var ticket = ticketRepository.findById(ticketId).orElseThrow();
        if(ticket.getStatus().equals(TicketStatus.ACTIVE)) {
            ticketRepository.deleteById(ticketId);
            return "Uspješno obrisano";
        }

        return null;
    }
    public List<TicketResponse> filteredSortedTickets(TicketFilterRequest ticketFilterRequest) {
        System.out.println("Usao u rutu");
        System.out.println();
        List<TicketResponse> tickets;
        if (ticketFilterRequest.getUserId() == null){
            tickets = ticketRepository
                    .findActiveTickets()
                    .stream()
                    .map(TicketResponse::new)
                    .collect(Collectors.toList());
        }
        else {
            System.out.println("Usao u branch " + ticketFilterRequest.getUserId());
            tickets = ticketRepository
                    .findAssignedTicketsForAgent(ticketFilterRequest.getUserId())
                    .stream()
                    .map(TicketResponse::new)
                    .collect(Collectors.toList());
        }
        if( ticketFilterRequest.getFilterType().contains("c")){
            tickets = tickets.stream().filter(ticket -> ticket.getCategory().equals(ticketFilterRequest.getCategory())).toList();
        }
        if( ticketFilterRequest.getFilterType().contains("p")){
            tickets = tickets.stream().filter(ticket -> ticket.getPriorityLevel().equals(ticketFilterRequest.getPriorityLevel())).toList();
        }
        if( ticketFilterRequest.getFilterType().contains("t")){
            tickets = tickets.stream().filter(ticket -> ticket.getTag().equals(ticketFilterRequest.getTag())).toList();
        }

        return tickets;

    }
    public List<TicketResponse> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        List<TicketResponse> responses = new ArrayList<>();
        tickets.forEach(ticket -> responses.add(new TicketResponse(ticket, false)));
        return responses;
    }
    public List<TicketResponse> getActiveTickets() {
        return ticketRepository
                .findActiveTickets()
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());
    }

    public List<TicketResponse> getAllTicketsForUser(Integer userId) {
        return ticketRepository
                .findAssignedTicketsForAgent(userId)
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());
    }

    public List<TicketResponse> getUrgentUnassignedTickets() {
        return ticketRepository
                .findUrgentUnassignedTickets()
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());
    }

    public TicketResponse assignTicketToUser(Integer ticketId, Integer userId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        if(ticket.getStatus().equals(TicketStatus.CLOSED) || ticket.getStatus().equals(TicketStatus.VERIFIED))
            return null;
        ticket.setStatus(TicketStatus.ASSIGNED);
        var user = userRepository.findById(userId).orElseThrow();
        ticket.setAssignedTo(user);
        ticketRepository.save(ticket);
        return  new TicketResponse(ticket);
    }

    public TicketResponse assignTicketToUserWithDeparment(Integer ticketId, Integer departmentId){
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow();
        if(ticket.getStatus().equals(TicketStatus.CLOSED) || ticket.getStatus().equals(TicketStatus.VERIFIED))
            return null;
        ticket.setStatus(TicketStatus.ASSIGNED);

        var user = userRepository.findUserInSpecificDepartment(departmentId);


        ticket.setAssignedTo(user);
        ticketRepository.save(ticket);
        return  new TicketResponse(ticket);
    }

    public List<TicketResponse>  getAssignedTicketsForAgent(String userEmail) {
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        return ticketRepository
                .findAssignedTicketsForAgent(user.getId())
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());
    }

    public List<TicketResponse>  getOpenTicketsForAgent(String userEmail) {
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        return ticketRepository
                .getOpenTicketsForAgent(user.getId())
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());
    }

    public List<TicketResponse>  getClosedTicketsForAgent(String userEmail) {
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        return ticketRepository
                .findClosedTicketsForAgent(user.getId())
                .stream()
                .map(TicketResponse::new)
                .collect(Collectors.toList());
    }

    public List<TicketResponse> getFilteredTickets(FilterRequest filterRequest) {
        List<TicketResponse> tickets;
        var user = userRepository.findByEmail(filterRequest.getUserEmail()).orElseThrow();

        if (filterRequest.getTicketType().equals("assigned")){
            tickets = ticketRepository
                    .findAssignedTicketsForAgent(user.getId())
                    .stream()
                    .map(TicketResponse::new)
                    .collect(Collectors.toList());
        }
        else if (filterRequest.getTicketType().equals("open")){
            tickets = ticketRepository
                    .getOpenTicketsForAgent(user.getId())
                    .stream()
                    .map(TicketResponse::new)
                    .collect(Collectors.toList());
        }
        else {
            tickets = ticketRepository
                    .findClosedTicketsForAgent(user.getId())
                    .stream()
                    .map(TicketResponse::new)
                    .collect(Collectors.toList());
        }
        if (!tickets.isEmpty()){
            tickets.sort(Comparator.comparing(TicketResponse::getDate));
            if(filterRequest.getSorting().equals("descending")){
                Collections.reverse(tickets);
            }
        }


        if( filterRequest.getCategory() != null){
            tickets = tickets.stream().filter(ticket -> ticket.getCategory().equals(filterRequest.getCategory())).toList();
        }
        if( filterRequest.getPriorityLevel() != null){
            tickets = tickets.stream().filter(ticket -> ticket.getPriorityLevel().equals(filterRequest.getPriorityLevel())).toList();
        }
        if( filterRequest.getTag() != null){
            tickets = tickets.stream().filter(ticket -> ticket.getTag().equals(filterRequest.getTag())).toList();
        }


        return tickets;
    }

}
