import { FetchMusicService } from './../fetch-music.service';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: any;
  token: any;

  constructor(private http: HttpClient, private fetchMusicService: FetchMusicService) { }

  ngOnInit() {
    setInterval(this.getToken, 3500000);
    this.getToken();
  }

  getToken() {
    this.http.get('/api/token')
      .toPromise()
      .then( (response) => {
        console.log('RESPONSE FROM SPOTIFY API', Object.keys(response));
        this.token = response['access_token'];
        // this.token = response.json().access_token;
        this.fetchMusic();
      })
      .catch( (error) => {
        console.log('FAILED TO RETRIEVE API');
      });
  }

  fetchMusic() {
    this.fetchMusicService.fetchTopSongs(this.token).subscribe( (responseFromService) => {
      const arrayOfTracks = responseFromService.json().items;
      console.log('API PAYLOAD', arrayOfTracks);
      const parsedTracks = arrayOfTracks.map( (track, index) => {
        if (index === 0) {
          console.log(track);
        }
        const preparedObject = {
          title: track.track.name,
          artistName: track.track.artists[0].name,
          popularityScore: track.track.popularity,
          listenLink: track.track.external_urls.spotify,
          artworkUrl: track.track.album.images[1].url,
          likes: 0
        };
        return preparedObject;
      });
      this.songs = parsedTracks;
    });
  }

  incrementLikes(song) {
    song.likes++;
  }

  addFavorite({artworkUrl, artistName, title}) {
    const songToAdd =  {
      artworkUrl,
      artistName,
      title
    };
    console.log('SONG TO ADD', songToAdd);
    const url = 'http://api-gateway:8080/favorites/';
    const localUrl = 'http://localhost:8080/favorites';
    this.http.post('/api/favorites', songToAdd)
    .subscribe( (response) => {
      console.log(response);
      console.log(this);
    }, (error) => {
      console.log('ERROR IN MAKING A POST TO FAVORITES');
    });
    console.log('HIT add favorite route');
  }

}
