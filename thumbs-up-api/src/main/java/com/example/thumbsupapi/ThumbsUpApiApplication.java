package com.example.thumbsupapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ThumbsUpApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ThumbsUpApiApplication.class, args);
	}
}
