package service.desk.airport.servicedesk.controller;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.desk.airport.servicedesk.dto.report.ReportCreateRequest;
import service.desk.airport.servicedesk.dto.report.ReportResponse;
import service.desk.airport.servicedesk.dto.report.ReportShortResponse;
import service.desk.airport.servicedesk.security.service.JwtService;
import service.desk.airport.servicedesk.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    JwtService jwtService;

    @Autowired
    ReportService reportService;

    @PostMapping("/add")
    public ResponseEntity<ReportResponse> createReport(@RequestBody ReportCreateRequest request,
                                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        var email = jwtService.extractUsername(token.substring(7));
        request.setResolvedByEmail(email);

        return ResponseEntity.ok(reportService.createReport(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportResponse> getReport(@PathVariable("id") Integer id) {

        return ResponseEntity.ok(reportService.getReportById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReportShortResponse>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }
}
