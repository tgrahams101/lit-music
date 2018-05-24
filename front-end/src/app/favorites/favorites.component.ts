import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any;
  constructor(private http: Http) { }

  ngOnInit() {

    this.http.get('/api/favorites')
    .subscribe( (response) => {
      console.log('RESPONSE FROM API FAVORITES', response.json());
      // console.log(this);
      this.favorites = response.json();
    }, (error) => {
      console.log('ERROR IN MAKING A POST TO FAVORITES');
    });
  }

  delete(item) {
    console.log('ITEM FOR DELETION', item);
    const index = this.favorites.indexOf(item);
    const url = '/api/favorites/' + item.id;
    console.log('URL TO HIT');
    this.http.delete(url)
    .subscribe ( (response) => {
      console.log('RESPONSE FROM SERVER FOR DELETION', response);
      console.log('INDEX FOR SPLICING', index);
      this.favorites.splice(index, 1);
    }
    , (error) => {
      console.log(error);
    });
  }

}
