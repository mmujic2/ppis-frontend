package service.desk.airport.servicedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.manual.ManualCreateRequest;
import service.desk.airport.servicedesk.dto.manual.ManualResponse;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.ManualService;

import java.util.List;


@RestController
@RequestMapping(path="/manual")
public class ManualController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private ManualService manualService;

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/add")
    public ResponseEntity<ManualResponse> createManual(@RequestBody ManualCreateRequest request,
                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        var email = jwtService.extractUsername(token.substring(7));
        request.setUserEmail(email);

        return ResponseEntity.ok(manualService.createManual(request));
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ManualResponse> updateManual(@RequestBody ManualCreateRequest request,
                                                       @PathVariable("id") Integer id) {

        return ResponseEntity.ok(manualService.updateManual(request,id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManualResponse> getManual(@PathVariable("id") Integer id) {

        return ResponseEntity.ok(manualService.getManual(id));
    }

    @PreAuthorize("hasRole('sd_agent')")
    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteManual(
            @PathVariable("id") Integer ticketId) {

        return ResponseEntity.ok(manualService.deleteManual(ticketId));

    }

    @GetMapping("/all")
    public ResponseEntity<List<ManualResponse>> getAllManuals() {
        return ResponseEntity.ok(manualService.getAllManuals());
    }

}
