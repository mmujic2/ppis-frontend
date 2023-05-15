package service.desk.airport.servicedesk.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.desk.airport.servicedesk.dao.ManualRepository;
import service.desk.airport.servicedesk.dto.manual.ManualCreateRequest;
import service.desk.airport.servicedesk.dto.manual.ManualResponse;
import service.desk.airport.servicedesk.dto.ticket.TicketResponse;
import service.desk.airport.servicedesk.entity.Manual;
import service.desk.airport.servicedesk.entity.Ticket;
import service.desk.airport.servicedesk.enums.Category;
import service.desk.airport.servicedesk.enums.TicketStatus;
import service.desk.airport.servicedesk.security.dao.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManualService {
    @Autowired
    ManualRepository manualRepository;

    @Autowired
    UserRepository userRepository;

    public ManualResponse createManual(ManualCreateRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail()).orElseThrow();
        var category = Category.valueOf(request.getCategory());
        var date = LocalDateTime.now();
        var manual = new Manual();
        manual.setCreatedBy(user);
        manual.setTitle(request.getTitle());
        manual.setContent(request.getContent());
        manual.setDateTime(date);
        manual.setCategory(category);

        manual = manualRepository.save(manual);

        return new ManualResponse(manual);
    }

    public ManualResponse updateManual(ManualCreateRequest request,Integer id) {

        var manual = manualRepository.findById(id).orElseThrow();

        if(request.getCategory()!=null) {
            var category = Category.valueOf(request.getCategory());
            manual.setCategory(category);
        }

        if(request.getTitle()!=null) {
            manual.setTitle(request.getTitle());
        }

        if(request.getContent()!=null) {
            manual.setContent(request.getContent());
        }

        var date = LocalDateTime.now();
        manual.setDateTime(date);


        manual = manualRepository.save(manual);

        return new ManualResponse(manual);
    }

    public ManualResponse getManual(Integer id) {
        return new ManualResponse(manualRepository.findById(id).orElseThrow());
    }

    public String deleteManual( Integer manualId) {
        manualRepository.deleteById(manualId);
        return "Manual ID:"+ manualId + " successfully deleted";
    }

    public List<ManualResponse> getAllManuals() {
        return manualRepository.findAll()
                .stream()
                .map(ManualResponse::new)
                .collect(Collectors.toList());
    }
}
