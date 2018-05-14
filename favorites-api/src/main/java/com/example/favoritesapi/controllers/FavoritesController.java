package com.example.favoritesapi.controllers;
import com.example.favoritesapi.models.Favorite;
import com.example.favoritesapi.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class FavoritesController {
    @Autowired
    private FavoriteRepository favoriteRepository;

    @GetMapping("/")
    public Iterable<Favorite> findAllFavorites() {
        return favoriteRepository.findAll();
    }

    @GetMapping("/{favoriteId}")
    public Favorite findFavoriteById(@PathVariable Long favoriteId) {
        return favoriteRepository.findOne(favoriteId);
    }

    @DeleteMapping("/{favoriteId}")
    public HttpStatus deleteFavoriteById(@PathVariable Long favoriteId) {
        favoriteRepository.delete(favoriteId);
        return HttpStatus.OK;
    }

    @PostMapping("/")
    public Favorite createNewFavorite(@RequestBody Favorite newFavorite) {
        return favoriteRepository.save(newFavorite);
    }

    @PatchMapping("/{favoriteId}")
    public Favorite	updateFavoriteById(@PathVariable Long favoriteId, @RequestBody Favorite favoriteRequest) {
        Favorite favoriteFromDb = favoriteRepository.findOne(favoriteId);

        favoriteFromDb.setTitle(favoriteRequest.getTitle());
        favoriteFromDb.setArtistName(favoriteRequest.getArtistName());
        favoriteFromDb.setArtworkUrl(favoriteRequest.getArtworkUrl());

        return favoriteRepository.save(favoriteFromDb);
    }
}