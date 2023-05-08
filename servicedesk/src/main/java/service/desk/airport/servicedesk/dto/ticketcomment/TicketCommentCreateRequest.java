package service.desk.airport.servicedesk.dto.ticketcomment;

public class TicketCommentCreateRequest {
    private String comment;
    private Integer ticketId;

    private String userEmail;

    public TicketCommentCreateRequest() {
    }

    public TicketCommentCreateRequest(String comment, Integer ticketId,String userEmail) {
        this.comment = comment;
        this.ticketId = ticketId;
        this.userEmail = userEmail;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
