package service.desk.airport.servicedesk.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import service.desk.airport.servicedesk.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report,Integer> {
}
