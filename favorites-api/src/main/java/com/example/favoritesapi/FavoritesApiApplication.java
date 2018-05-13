package com.example.favoritesapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableEurekaClient
@RestController
public class FavoritesApiApplication {

	@RequestMapping("/")
	public String home() {
		return "Gucci Mane";
	}


	public static void main(String[] args) {
		SpringApplication.run(FavoritesApiApplication.class, args);
	}
}
