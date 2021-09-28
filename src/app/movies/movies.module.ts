import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie/movie.component';
import { FormsModule } from '@angular/forms';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@NgModule({
  declarations: [MoviesComponent, MovieComponent, EditMovieComponent],
  imports: [
    CommonModule,
    FormsModule,
    MdbFormsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
