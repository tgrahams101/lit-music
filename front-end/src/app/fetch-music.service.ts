import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FetchMusicService {

  constructor(private http: Http) { }

  fetchTopSongs(token) {
    const headerTable = {
      'Authorization': 'Bearer BQBScDyy-YNARV-Enlv2nfJNSkm77raGstb_icChS8tAFJwP3OmdGpU0iqp7AoE_5X8jNFxq2DX0UJtDZZ8'
    };
    const options = new RequestOptions();
    options.headers = this.createHeaders(token);
    const url = 'https://api.spotify.com/v1/users/spotify/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks';
    // tslint:disable-next-line:max-line-length
    return this.http.get(url, options);
    // tslint:disable-next-line:max-line-length
    // return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip=07083,us&appid=052f26926ae9784c2d677ca7bc5dec98&&units=imperial');
  }

  searchSpotify(token, query) {
    console.log('TOKEN', token);
    console.log('QUERY', query);
    const headers = this.createHeaders(token);
    const url = 'https://api.spotify.com/v1/search';
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('type', 'track');

    return this.http.get(url, { headers, search: params });
  }

  createHeaders(token) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }

}
