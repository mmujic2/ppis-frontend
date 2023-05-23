package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dao.TicketRepository;
import service.desk.airport.servicedesk.dto.other.idArray;
import service.desk.airport.servicedesk.dto.ticket.FilterRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketCreateRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketFilterRequest;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.TicketService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(path="/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private JwtService jwtService;

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/create")
    public ResponseEntity<TicketResponse> createTicket(
            @RequestBody TicketCreateRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {

        var email = jwtService.extractUsername(token.substring(7));
        request.setUserEmail(email);
        try {
            return ResponseEntity.ok(ticketService.createTicket(request));
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }

    @Autowired
    TicketRepository ticketRepository;

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable("id")Integer ticketId) {
        try {
            return ResponseEntity.ok(new TicketResponse(ticketService.getTicket(ticketId),false));
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<TicketResponse> getTicketByCode(@PathVariable("code")String ticketCode) {
        try {
            return ResponseEntity.ok(new TicketResponse(ticketService.getTicketByCode(ticketCode),false));
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/related/{id}")
    public ResponseEntity<TicketResponse> getTicketWithRelatedById(@PathVariable("id")Integer ticketId) {
        try {
            return ResponseEntity.ok(new TicketResponse(ticketService.getTicket(ticketId), false));
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/idarray")
    public ResponseEntity<List<TicketResponse>> getTicketsByListId(@RequestBody idArray ids) {
        List<TicketResponse> ticketRespones = new ArrayList<>();
        for(var t : ticketRepository.findAllById(ids.ids)) {
            ticketRespones.add(new TicketResponse(t, false));
        }
        return ResponseEntity.ok(ticketRespones);
    }

    @GetMapping("/active")
    public ResponseEntity<List<TicketResponse>> getActiveTicketsForUser(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(ticketService.getActiveTicketsForUser(userEmail));
    }

    @GetMapping("/processed")
    public ResponseEntity<List<TicketResponse>> getProcessedTicketsForUser(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(ticketService.getProcessedTicketsForUser(userEmail));
    }

    @GetMapping("/others")
    public ResponseEntity<List<TicketResponse>> getOtherTicketsForUser(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(ticketService.getOtherTicketsForUser(userEmail));
    }
    @GetMapping("/agentassigned")
    public ResponseEntity<List<TicketResponse>> getAssignedTicketsForAgent(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(ticketService.getAssignedTicketsForAgent(userEmail));
    }

    @GetMapping("/agentopen")
    public ResponseEntity<List<TicketResponse>> getOpenTicketsForAgent(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(ticketService.getOpenTicketsForAgent(userEmail));
    }

    @GetMapping("/agentclosed")
    public ResponseEntity<List<TicketResponse>> getClosedTicketsForAgent(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        return ResponseEntity.ok(ticketService.getClosedTicketsForAgent(userEmail));
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/assign/{id}")
    public ResponseEntity<TicketResponse> assignTicket(
            @PathVariable("id") Integer ticketId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            var userEmail = jwtService.extractUsername(token.substring(7));

            var res = ticketService.assignTicket(userEmail, ticketId);
            if(res==null)
                return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(400));


            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('sd_user')")
    @PostMapping("/verify/{id}")
    public ResponseEntity<TicketResponse> verifyTicket(
            @PathVariable("id") Integer ticketId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            var res = ticketService.verifyTicket(ticketId);
            if(res==null)
                return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(400));

            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return new  ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('sd_user')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable("id") Integer ticketId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var res = ticketService.deleteTicket(ticketId);
        if(res==null)
            return new ResponseEntity<String>("Nije moguće obrisati ticket", HttpStatusCode.valueOf(400));

        return ResponseEntity.ok("Uspješno obrisano");
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/close/{id}")
    public ResponseEntity<TicketResponse> closeTicket(
            @PathVariable("id") Integer ticketId) {

            return ResponseEntity.ok(ticketService.closeTicket(ticketId));

    }

    @PreAuthorize("hasRole('sd_agent')")
    @GetMapping("/all")
    public ResponseEntity<List<TicketResponse>> getAllTickets(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) { //helper route, probably delete later
        try {
            // var t = ticketService.getAllTickets();
            return ResponseEntity.ok(ticketService.getAllTickets());
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/filter")
    public ResponseEntity<List<TicketResponse>> getFilteredTickets(
            @RequestBody TicketFilterRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            System.out.println("blb");
            return ResponseEntity.ok(ticketService.filteredSortedTickets(request));
        } catch (Exception e) {
            return new ResponseEntity<List<TicketResponse>>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/related/{ticketid}/{relatedticketid}")
    public ResponseEntity<TicketResponse> addRelatedTicketTo(
            @PathVariable("ticketid") Integer ticketId,
            @PathVariable("relatedticketid") Integer relatedTicketId) {
        try{
            var ticket = ticketService.getTicket((ticketId));


            for(var t : ticket.getRelatedTickets()) {
                if(Objects.equals(t.getId(), relatedTicketId)) {
                    return new ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
                }
            }

            var relatedTicket = ticketService.getTicket((relatedTicketId));

            if(Objects.equals(ticket.getId(), relatedTicket.getId())) {
                return new ResponseEntity<TicketResponse>(HttpStatus.BAD_REQUEST);
            }

            ticket.addRelatedTicket(relatedTicket);
            relatedTicket.addRelatedTicket(ticket);
            ticketRepository.save(ticket);
            ticketRepository.save(relatedTicket);
            return ResponseEntity.ok(new TicketResponse(ticket, false));
        }
        catch(Exception e) {
            return new ResponseEntity<TicketResponse>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/related/wipe/{ticketid}")
    public ResponseEntity<TicketResponse> wipeRelatedTickets(@PathVariable Integer ticketid) {
        var ticket = ticketService.getTicket(ticketid);
        ticket.setRelatedTickets(new ArrayList<>());
        ticketRepository.save(ticket);
        return ResponseEntity.ok(new TicketResponse(ticket, false));
    }

    @PostMapping("/related/delete/{ticketid}/{relatedticketid}")
    public ResponseEntity<TicketResponse> deleteSingleRelatedTicket(
            @PathVariable Integer ticketid,
            @PathVariable Integer relatedticketid) {
        try {
            var ticket = ticketService.getTicket(ticketid);
            var relatedTicket = ticketService.getTicket(relatedticketid);

            ticket.removeRelatedTicket(relatedTicket);
            relatedTicket.removeRelatedTicket(ticket);

            ticketRepository.save(ticket);
            ticketRepository.save(relatedTicket);
            return ResponseEntity.ok(new TicketResponse(ticket, false));
        }catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PreAuthorize("hasRole('sd_agent')")
    @GetMapping("/urgent")
    public ResponseEntity<List<TicketResponse>> getUrgentActiveTickets() {
        return ResponseEntity.ok(ticketService.getUrgentUnassignedTickets());
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/assign/{ticket_id}/{user_id}")
    public ResponseEntity<TicketResponse> assignTicketToUser(@PathVariable Integer ticket_id, @PathVariable Integer user_id) {
        try {

            var res = ticketService.assignTicketToUser(ticket_id, user_id);
            //Ticket is already VERIFIED or CLOSED
            if(res==null)
                return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(400));

            return ResponseEntity.ok(res);
        } catch (Exception e) {
            //User or ticket with those ids weren't found
            return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(404));
        }
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/assign/department/{ticket_id}/{department_id}")
    public ResponseEntity<TicketResponse> forwardTicketToDepartment(@PathVariable Integer ticket_id, @PathVariable Integer department_id,@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        try {
            var agentEmail = jwtService.extractUsername(token.substring(7));
            var res = ticketService.assignTicketToUserWithDeparment(ticket_id, department_id,agentEmail);
            //Ticket is already VERIFIED or CLOSED
            if(res==null)
                return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(400));
            else if(res.getAssignedTo() == null)
                return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(404));
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            //User or ticket with those ids weren't found
            return new ResponseEntity<TicketResponse>((TicketResponse) null, HttpStatusCode.valueOf(404));
        }
    }

    @PostMapping("/agentfilter")
    public ResponseEntity<List<TicketResponse>> getFilteredAssignedTicketsForAgent(
            @RequestBody FilterRequest request,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token
    ) {
        var userEmail = jwtService.extractUsername(token.substring(7));
        request.setUserEmail(userEmail);
        return ResponseEntity.ok(ticketService.getFilteredTickets(request));
    }





}
