import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FetchMusicService {

  constructor(private http: Http) { }

  fetchTopSongs() {
    const headerTable = {
      'Authorization': 'Bearer BQBScDyy-YNARV-Enlv2nfJNSkm77raGstb_icChS8tAFJwP3OmdGpU0iqp7AoE_5X8jNFxq2DX0UJtDZZ8'
    };
    const headers = new Headers();
    headers.append('Authorization', 'Bearer BQDZbBcYfN8F8Uxip5oh_rzpFwyENQ9abexGVKTVQa3O_12DhBbQyPGjBsYKhbJ5QYjJj_-5Tmv0XkshlrA');
    const options = new RequestOptions();
    options.headers = headers;
    const url = 'https://api.spotify.com/v1/users/spotify/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks';
    // tslint:disable-next-line:max-line-length
    return this.http.get(url, options);
    // tslint:disable-next-line:max-line-length
    // return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip=07083,us&appid=052f26926ae9784c2d677ca7bc5dec98&&units=imperial');
  }

}
