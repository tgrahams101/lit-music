import { FetchMusicService } from './../fetch-music.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: any;

  constructor(private http: Http, private fetchMusicService: FetchMusicService) { }

  ngOnInit() {

    this.fetchMusicService.fetchTopSongs().subscribe( (response) => {
      console.log('GUCCI MANE!');
      const arrayOfTracks = response.json().items;
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
      console.log(this.songs);
    });
  }

  incrementLikes(song) {
    song.likes++;
  }

}
