import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  // list of popular movies
  popularMovies = [];
  // list of upcoming movies
  upcomingMovies = [];
  // loading
  isLoading = [true, true];
  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    // getting popular movies
    this.subscriptions.add(
      this.moviesService.getUpdatedPopularMoviesListener().subscribe(
        (result: any) => {
          this.popularMovies = result.results;
          this.isLoading[0] = false;
        }
      )
    );
    this.moviesService.popular();
    // getting upcoming movies
    this.subscriptions.add(
      this.moviesService.getUpdatedUpcomingMoviesListener().subscribe(
        (result: any) => {
          this.upcomingMovies = result.results;
          this.isLoading[1] = false;
        }
      )
    );
    this.moviesService.upcoming();
  }
  // select movie
  onSelectMovie(id) {
    this.router.navigate(['movies/movie', id]);
  }

  ngOnDestroy(): void {
    // unsubscribing from subscriptions on destroy
    this.subscriptions.unsubscribe();
  }

}
