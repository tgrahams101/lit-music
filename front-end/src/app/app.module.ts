import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { RouterModule } from '@angular/router';
import { FetchMusicService } from './fetch-music.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [FetchMusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
