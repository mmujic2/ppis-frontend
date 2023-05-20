package service.desk.airport.servicedesk.dto.report;

import service.desk.airport.servicedesk.entity.Report;
import service.desk.airport.servicedesk.enums.PriorityLevel;
import service.desk.airport.servicedesk.enums.TicketTag;
import service.desk.airport.servicedesk.security.dto.UserResponse;

import java.time.LocalDateTime;

public class ReportShortResponse {
    private Integer id;
    private String tag;
    private String department;

    private LocalDateTime reportDate;

    private String code;


    private String raisedBy;

    private String resolvedBy;

    public ReportShortResponse() {
    }

    public ReportShortResponse(Report report) {
        this.id = report.getId();
        this.code = report.getCode();
        this.department = report.getDepartment();
        this.tag = report.getTag().equals("INCIDENT") ? "Incident" : "Zahtjev za uslugom";
        this.reportDate = report.getReportDate();
        this.raisedBy = report.getRaisedBy().getFirstname() + " " + report.getRaisedBy().getLastname();
        this.resolvedBy = report.getResolvedBy().getFirstname() + " " + report.getResolvedBy().getLastname();
    }

    public ReportShortResponse(Integer id, String tag, String department, LocalDateTime reportDate, String code, String raisedBy, String resolvedBy) {
        this.id = id;
        this.tag = tag;
        this.department = department;
        this.reportDate = reportDate;
        this.code = code;
        this.raisedBy = raisedBy;
        this.resolvedBy = resolvedBy;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDateTime getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDateTime reportDate) {
        this.reportDate = reportDate;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRaisedBy() {
        return raisedBy;
    }

    public void setRaisedBy(String raisedBy) {
        this.raisedBy = raisedBy;
    }

    public String getResolvedBy() {
        return resolvedBy;
    }

    public void setResolvedBy(String resolvedBy) {
        this.resolvedBy = resolvedBy;
    }
}


