package service.desk.airport.servicedesk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import service.desk.airport.servicedesk.security.dao.DepartmentRepository;
import service.desk.airport.servicedesk.security.dao.RoleRepository;
import service.desk.airport.servicedesk.security.dao.UserRepository;
import service.desk.airport.servicedesk.security.entity.Department;
import service.desk.airport.servicedesk.security.entity.Role;
import service.desk.airport.servicedesk.security.entity.User;
import service.desk.airport.servicedesk.security.token.TokenRepository;

@EnableJpaRepositories(basePackages = { "service.desk.airport.servicedesk.dao","service.desk.airport.servicedesk.security.dao","service.desk.airport.servicedesk.security.token"})
@EntityScan(basePackages = {"service.desk.airport.servicedesk.entity","service.desk.airport.servicedesk.security.entity","service.desk.airport.servicedesk.security.token"})
@SpringBootApplication//(exclude = {DataSourceAutoConfiguration.class })
public class ServicedeskApplication implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	TokenRepository tokenRepository;


	public static void main(String[] args) {
		SpringApplication.run(ServicedeskApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception
	{
		deleteExpiredTokens();
		//cleanup();
		//startingData();
	}
	private void cleanup() {
		userRepository.deleteAll();
		departmentRepository.deleteAll();
		roleRepository.deleteAll();
	}

	private void deleteExpiredTokens() {
		tokenRepository.deleteInvalidTokens();
	}

	private void startingData() {
		Department depadmin = new Department("admindepartment");
		departmentRepository.save(depadmin);
		Role roladmin = new Role("admin");
		roleRepository.save(roladmin);
		User admin = new User("Admin","Admin","admin@admin.com", "adminpass", depadmin, roladmin);
		userRepository.save(admin);
	}

}
