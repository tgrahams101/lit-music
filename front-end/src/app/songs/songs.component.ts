import { environment } from './../../environments/environment';
import { FetchMusicService } from './../fetch-music.service';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: any;
  token: any;
  searchQuery: string;
  searchSubject = new Subject();

  constructor(private http: HttpClient, private fetchMusicService: FetchMusicService) { }

  ngOnInit() {
    setInterval(this.getToken, 3500000);
    // tslint:disable-next-line:no-unused-expression
    this.token || this.getToken();
    this.searchSubject.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe( (query) => {
        console.log('QUERY FROM PIPED SUBJECT', query);
        this.fetchMusicService.searchSpotify(this.token, query)
        .subscribe( (response) => {
          console.log('RESPONSE FROM FETCH MUSIC', response);
          console.log('RESPONSE FROM SERVICE', response);
          let json = response.json();
          json = json.tracks.items;
          console.log(json);
          const preparedSongs = json.map((element) => {
            return {
              artistName: element.artists.reduce((previous, currentArtist, currentIndex) => {
                return currentIndex === 0 ? `${currentArtist.name}` : previous + ` and ${currentArtist.name}`;
              }, ''),
              artworkUrl: element.album.images[1].url,
              title: element.name,
              popularityScore: element.popularity,
              playUrl: element.external_urls.spotify,
              likes: 0
            };
          });
          console.log(preparedSongs);
          this.songs = preparedSongs;
        });
      });
  }

  getToken() {
    this.http.get(`${environment.nodeHost}/api/token`)
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
          playUrl: track.track.external_urls.spotify,
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

  searchTracks(query) {
    this.searchSubject.next(query);
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
    console.log('WHATS THE ENV VARIABLE', environment.apiHost);
    this.http.post(`${environment.apiHost}/api/favorites`, songToAdd)
    .subscribe( (response) => {
      console.log(response);
      console.log(this);
    }, (error) => {
      console.log('ERROR IN MAKING A POST TO FAVORITES');
    });
    console.log('HIT add favorite route');
  }

}
