import { TestBed, inject } from '@angular/core/testing';

import { FetchMusicService } from './fetch-music.service';

describe('FetchMusicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchMusicService]
    });
  });

  it('should be created', inject([FetchMusicService], (service: FetchMusicService) => {
    expect(service).toBeTruthy();
  }));
});
