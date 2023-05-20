package service.desk.airport.servicedesk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.ReportRepository;
import service.desk.airport.servicedesk.dto.report.ReportCreateRequest;
import service.desk.airport.servicedesk.dto.report.ReportResponse;
import service.desk.airport.servicedesk.dto.report.ReportShortResponse;
import service.desk.airport.servicedesk.entity.Report;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.dao.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {
    @Autowired
    ReportRepository reportRepository;

    @Autowired
    UserRepository userRepository;

    public ReportResponse createReport(ReportCreateRequest request) {
        var resolvedBy = userRepository.findByEmail(request.getResolvedByEmail()).orElseThrow();
        var raisedBy = userRepository.findById(request.getRaisedById()).orElseThrow();
        var date = LocalDateTime.now();
        var tag = TicketTag.valueOf(request.getTag());
        var priorityLevel = PriorityLevel.valueOf(request.getPriorityLevel());


        var report = new Report();
        report.setCode(request.getCode());
        report.setTag(tag);
        report.setReportDate(date);
        report.setDescription(request.getDescription());
        report.setBusinessImpact(request.getBusinessImpact());
        report.setCorrectiveActions(request.getCorrectiveActions());
        report.setDateTimeRequested(request.getDateTimeRequested());
        report.setDuration(request.getDuration());
        report.setDepartment(request.getDepartment());
        report.setPriorityLevel(priorityLevel);
        report.setRaisedBy(raisedBy);
        report.setResolvedBy(resolvedBy);
        report.setSlaBreached(request.getSlaBreached());

        report =reportRepository.save(report);

        return new ReportResponse(report);
    }

    public ReportResponse getReportById(Integer id) {
        return new ReportResponse(reportRepository.findById(id).orElseThrow());
    }

    public List<ReportShortResponse> getAllReports() {
        return reportRepository
                .findAll(Sort.by("reportDate"))
                .stream()
                .map(r -> new ReportShortResponse(r))
                .collect(Collectors.toList());
    }
}
