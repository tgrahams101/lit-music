package com.example.thumbsupapi.repositories;

import com.example.thumbsupapi.models.Thumbsup;
import org.springframework.data.repository.CrudRepository;

public interface ThumbsupRepository extends CrudRepository<Thumbsup, Long> {

}