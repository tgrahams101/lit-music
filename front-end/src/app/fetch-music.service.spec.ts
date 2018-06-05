import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Http, HttpModule } from '@angular/http';
import { TestBed, inject, async } from '@angular/core/testing';

import { FetchMusicService } from './fetch-music.service';

describe('FetchMusicService', () => {
  let service: FetchMusicService;
  let httpMock: HttpTestingController;
  let dummySongs: any[];

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      providers: [FetchMusicService, HttpTestingController],
      imports: [
        HttpModule,
        HttpClientModule,
        FormsModule
      ]
    })
    .compileComponents();
    service = TestBed.get(FetchMusicService);
    httpMock = TestBed.get(HttpTestingController);

    this.dummySongs = [ {
      title: 'Superstar',
      artistName: 'Lupe Fiasco',
      artworkUrl: 'superstar.jpeg'
    }];
  }));

  // it('should be created', inject([FetchMusicService], (service: FetchMusicService) => {
  //   expect(service).toBeTruthy();
  // }));
  it('fetchTopSongs() should fetch top songs', async(() => {
  //   service.fetchTopSongs('token')
  //  .subscribe( (response) => {
  //   expect(response).toEqual(this.dummySongs);
  //       // expect(response.length).toBe(1);
  //   });
  }));
  // const mock = httpMock.expectOne('/api/favorites');

  // expect(mock.request.method).toBe('GET');

  // mock.flush(this.dummySongs);

  // httpMock.verify();
});
