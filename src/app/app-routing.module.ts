import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralConditionsComponent } from './general-conditions/general-conditions.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)},
  {path: 'general-conditions', component: GeneralConditionsComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
