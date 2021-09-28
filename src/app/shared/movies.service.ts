import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  api_key = '2f74e6ac6b5fb99e2f57bfedfa4d7067';
  updatedPopularMovies = new Subject();
  updatedUpcomingMovies = new Subject();
  updatedPlayingMovies = new Subject();
  constructor(private http: HttpClient) { }

  getUpdatedPopularMoviesListener() {
    return this.updatedPopularMovies.asObservable();
  }
  getUpdatedUpcomingMoviesListener() {
    return this.updatedUpcomingMovies.asObservable();
  }
  getUpdatedPlayingMoviesListener() {
    return this.updatedPlayingMovies.asObservable();
  }

  popular(page = 1) {
    this.http.get('movie/popular?api_key='+this.api_key+'&page='+page).subscribe(
      result => {
        this.updatedPopularMovies.next(result);
      }
    );
  }
  upcoming(page = 1) {
    this.http.get('movie/upcoming?api_key='+this.api_key+'&page='+page).subscribe(
      result => {
        this.updatedUpcomingMovies.next(result);
      }
    );
  }
  now_playing(page = 1) {
    this.http.get('movie/now_playing?api_key='+this.api_key+'&page='+page).subscribe(
      result => {
        this.updatedPlayingMovies.next(result);
      }
    );
  }
  one(id) {
    return this.http.get('movie/'+id+'?api_key='+this.api_key);
  }
  credits(id) {
    return this.http.get('movie/'+id+'/credits?api_key='+this.api_key);
  }
  search(text) {
    return this.http.get('search/movie?api_key='+this.api_key+'&query='+text);
  }
}
