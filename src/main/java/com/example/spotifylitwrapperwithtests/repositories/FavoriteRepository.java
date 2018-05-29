package com.example.spotifylitwrapperwithtests.repositories;

import com.example.spotifylitwrapperwithtests.models.Favorite;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

}