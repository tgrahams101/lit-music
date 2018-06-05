package com.example.favoritesapi.models;

import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
@Table(name = "Favorites")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "artist_name")
    private String artistName;

    @Column(name ="artwork_url")
    private String artworkUrl;

    public Favorite(String title, String artistName, String artworkUrl) {
        this.title = title;
        this.artistName = artistName;
        this.artworkUrl = artworkUrl;
    }
}