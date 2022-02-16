package com.searchservice.api;





import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
public class SpringBootSearchServiceProjectApplication{

	public static void main(String[] args)  {
		SpringApplication.run(SpringBootSearchServiceProjectApplication.class, args);
		
	}
	
	
	 @PostConstruct
 	 public void init(){
	      // Setting Spring Boot SetTimeZone
	      TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	  }
	 
	 @Bean
	 public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
	        public void addCorsMappings(CorsRegistry registry) { registry.addMapping("/**").allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");	}
			};
		}

}
