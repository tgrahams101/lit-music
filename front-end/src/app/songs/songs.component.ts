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
      const parsedTracks = arrayOfTracks.map( (track) => {
        const preparedObject = {
          title: track.track.name,
          artistName: track.track.artists[0].name,
          popularityScore: track.track.popularity,
          artworkUrl: track.track.preview_url
        };
        return preparedObject;
      });
      this.songs = parsedTracks;
      console.log(this.songs);
    });
  }

}
