package com.example.favoritesapi.repositories;

import com.example.favoritesapi.models.Favorite;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

}