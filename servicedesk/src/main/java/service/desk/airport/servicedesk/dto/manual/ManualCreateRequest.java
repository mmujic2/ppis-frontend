package service.desk.airport.servicedesk.dto.manual;


public class ManualCreateRequest {
    private String title;
    private String content;
    private String category;

    private String userEmail;


    public ManualCreateRequest(String title, String content, String category, String userEmail) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.userEmail = userEmail;
    }

    public ManualCreateRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}


