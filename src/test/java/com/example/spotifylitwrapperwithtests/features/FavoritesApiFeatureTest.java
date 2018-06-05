package com.example.spotifylitwrapperwithtests.features;

import com.codeborne.selenide.CollectionCondition;
import com.example.spotifylitwrapperwithtests.models.Favorite;
import com.example.spotifylitwrapperwithtests.repositories.FavoriteRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static com.codeborne.selenide.Condition.appear;
import static com.codeborne.selenide.Condition.text;
import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;
import static com.codeborne.selenide.Selenide.open;

import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class FavoritesApiFeatureTest {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Before
    public void setUp() {
        favoriteRepository.deleteAll();
    }

    @After
    public void tearDown() {
        favoriteRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudFunctionalityForAFavorite() throws Exception {

        Favorite firstFavorite = new Favorite(
                "Swag Surfin",
                "FLY",
                "surfin.jpeg"
        );

        Favorite secondFavorite = new Favorite(
                "Like a Dog Chasing Cars",
                "Hanz Zimmer",
                "darkknight.png"
        );

        Stream.of(firstFavorite , secondFavorite)
                .forEach(favorite -> {
                    favoriteRepository.save(favorite);
                });
        System.setProperty("selenide.browser", "Chrome");

        //Seat headless browser
        System.setProperty("selenide.headless", "true");

        // Visit the UI in a browser
        open("http://localhost:4200");
        Thread.sleep(8000);
        // There should be more than 15 songs
        $$("[data-song-display]").shouldHave(CollectionCondition.sizeGreaterThan(15));

        // Test that text shows up for each song
//        long firstSongId = firstSong.getId();
        $("#song-" + 0 + "-title").shouldHave(text(""));
        $("#song-" + 0 + "-artist-name").shouldHave(text(""));


        $("#song-" + 11 + "-title").shouldHave(text(""));
        $("#song-" + 11 + "-artist-name").shouldHave(text(""));

        // Visit the view favorites page
        $("#favorites-link").click();

// Make sure the link worked and the form is now showing
        $("#favorites-header").should(appear);
//

        // There should be more than 2 favorites
        $$("[data-favorite-display]").shouldHave(CollectionCondition.size(2));

        // Test that text shows up for each song
//        long firstSongId = firstSong.getId();
        $("#favorite-" + 0 + "-title").shouldHave(text(""));
        $("#favorite-" + 0 + "-artist-name").shouldHave(text(""));

        // Delete a song works as expected
        $("#delete-song-" + 0).click();
        $$("[data-favorite-display]").shouldHave(CollectionCondition.size(1));

        // Navigating home works
        $("#navigate-home").click();

        // Make sure the link worked and the form is now showing
        $("#songs-header").should(appear);

        // Add a favorite
        $("#add-favorite-" + 0).click();
        $("#favorites-link").click();
        Thread.sleep(4000);
        $$("[data-favorite-display]").shouldHave(CollectionCondition.size(2));

        when()
                .get("http://localhost:8080/api/favorites")
                .then()
                .statusCode(is(200))
                .and()
                .body(containsString("Dog"))
                .and()
                .body(containsString("Hanz"));

        when()
                .get("http://localhost:8080/api/favorites/" + secondFavorite.getId())
                .then()
                .statusCode(is(200))
                .body(containsString("Hanz"))
                .body(containsString("Zimmer"));

        when()
                .delete("http://localhost:8080/api/favorites/" + secondFavorite.getId())
                .then()
                .statusCode(is(200));
    }


}