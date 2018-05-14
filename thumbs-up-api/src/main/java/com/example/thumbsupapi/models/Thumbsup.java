package com.example.thumbsupapi.models;

import lombok.*;
import javax.persistence.*;
import java.time.Instant;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
@Table(name = "Thumbsups")
public class Thumbsup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "favorite_id")
    private Integer favoriteId;

    @Column(name = "time_stamp")
    private Instant timeStamp;
}