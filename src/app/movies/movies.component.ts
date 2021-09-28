import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  subscriptions = new Subscription();
  // list of popular movies
  movies = [];
  // current page
  page = 1;
  // total pages
  total_pages = 1;
  pages = [1];
  // loading
  isLoading = true;
  type = '';
  title = {
    'popular': "What's Popular",
    'upcoming': "Upcoming",
    'now_playing': "Now Playing"
  };
  // search text
  searchLike = '';
  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // getting the type of movies requested
    this.type = this.route.snapshot.params.type;
    // subscribing to the active route to watch for changes of type
    this.route.params.subscribe(
      p => {
        this.movies = [];
        this.page = 1;
        this.type = p.type;
        this.getData();
      }
    );
    // getting popular movies
    this.subscriptions.add(
      this.moviesService.getUpdatedPopularMoviesListener().subscribe(
        (result: any) => {
          this.movies = result.results;
          this.total_pages = result.total_pages;
          this.setPaginationButtons();
          this.isLoading = false;
        }
      )
    );
    // getting upcoming movies
    this.subscriptions.add(
      this.moviesService.getUpdatedUpcomingMoviesListener().subscribe(
        (result: any) => {
          this.movies = result.results;
          this.total_pages = result.total_pages;
          this.setPaginationButtons();
          this.isLoading = false;
        }
      )
    );
    this.subscriptions.add(
      this.moviesService.getUpdatedPlayingMoviesListener().subscribe(
        (result: any) => {
          this.movies = result.results;
          this.total_pages = result.total_pages;
          this.setPaginationButtons();
          this.isLoading = false;
        }
      )
    );
  }

  // getting movies in terms of type requested
  getData() {
    this.isLoading = true;
    this.movies = [];
    switch(this.type) {
      case 'popular' :
        this.moviesService.popular(this.page);
        break;
      case 'upcoming' :
        this.moviesService.upcoming(this.page);
        break;
      case 'now_playing' :
        this.moviesService.now_playing(this.page);
        break;
    }
  }
  // changing the current page selected
  onSelectPage(page) {
    this.page = page;
    this.setPaginationButtons();
    this.getData();
  }
  // set pagination buttons
  setPaginationButtons() {
    // starting button in pagination
    let startPage = 1;
    // maximum shown buttons in pagination
    let maxPages = 1;
    if(this.total_pages > 1) {
      if(this.page < this.total_pages) {
        if(this.page > 1) {
          startPage = this.page - 1;
        }
        if(this.page > 1 || this.total_pages > 3) {
          maxPages = 3;
        }
      } else {
        if(this.page >= 3) {
          startPage = this.page - 2;
          maxPages = 3;
        } else {
          maxPages = 2;
        }
        
      }
    }
    this.pages = [];
    for(let i =startPage;this.pages.length< maxPages;i++) {
      this.pages.push(i);
    }
    console.log(this.pages, startPage, maxPages)
  }
  // previous page clicked
  onPreviousPage() {
    if(this.page > 1) {
      this.page--;
      this.setPaginationButtons();
      this.getData();
    }
  }
  // next page clicked
  onNextPage() {
    if(this.page < this.total_pages) {
      this.page++;
      this.setPaginationButtons();
      this.getData();
    }
  }
  // select movie
  onSelectMovie(id) {
    this.router.navigate(['movies/movie', id]);
  }
  onSearch() {
    if(this.searchLike.length >= 3) {
      this.isLoading = true;
      this.movies = [];
      this.moviesService.search(this.searchLike).subscribe(
        (result: any) => {
          this.movies = result.results;
          this.total_pages = result.total_pages;
          this.setPaginationButtons();
          this.isLoading = false;
        }
      )
    }
  }
  ngOnDestroy(): void {
    // unsubscribing from subscriptions on destroy
    this.subscriptions.unsubscribe();
  }

}
