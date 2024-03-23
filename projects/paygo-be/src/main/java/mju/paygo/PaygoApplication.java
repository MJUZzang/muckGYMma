package mju.paygo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PaygoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PaygoApplication.class, args);
	}

}
