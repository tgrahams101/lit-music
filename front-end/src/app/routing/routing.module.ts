import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from '../favorites/favorites.component';
import { SongsComponent } from '../songs/songs.component';


const routes: Routes = [

  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: '',
    component: SongsComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
