package com.example.thumbsupapi.controllers;

import com.example.thumbsupapi.models.Thumbsup;
import com.example.thumbsupapi.repositories.ThumbsupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class ThumbsupController {
    @Autowired
    private ThumbsupRepository thumbsupRepository;

    @GetMapping("/")
    public Iterable<Thumbsup> findAllThumbsups() {
        return thumbsupRepository.findAll();
    }

    @GetMapping("/{thumbsupId}")
    public Thumbsup findThumbsupById(@PathVariable Long thumbsupId) {
        return thumbsupRepository.findOne(thumbsupId);
    }

    @DeleteMapping("/{thumbsupId}")
    public HttpStatus deleteThumbsupById(@PathVariable Long thumbsupId) {
        thumbsupRepository.delete(thumbsupId);
        return HttpStatus.OK;
    }

    @PostMapping("/")
    public Thumbsup createNewThumbsup(@RequestBody Thumbsup newThumbsup) {
        return thumbsupRepository.save(newThumbsup);
    }

}