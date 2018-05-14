package com.example.favoritesapi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class FavoritesApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FavoritesApiApplication.class, args);
	}
}
