package com.example.spotifylitwrapperwithtests.models;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "Favorites")
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

    public Favorite() {}

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getArtistName() {
        return artistName;
    }

    public String getArtworkUrl() {
        return artworkUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public void setArtworkUrl(String artworkUrl) {
        this.artworkUrl = artworkUrl;
    }
}
