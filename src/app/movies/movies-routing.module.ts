import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {path: 'movie/:id', component: MovieComponent},
  {path: 'edit-movie/:id', component: EditMovieComponent},
  {path: ':type', component: MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
