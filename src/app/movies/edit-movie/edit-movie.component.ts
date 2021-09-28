import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  // list of popular movies
  movie: any = null;
  credits = [];
  id = null;
  // loading
  isLoading = true;
  // movie form
  @ViewChild('movieForm') movieForm: NgForm;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // getting the id of movies requested
    this.id = this.route.snapshot.params.id;
    this.subscriptions.add(
      this.moviesService.one(this.id).subscribe(
        result => {
          this.isLoading = false;
          this.movie = result;
          this.movie.genre_ids = this.movie.genres.map(element => {
            return element.id;
          })
          console.log(this.movie);
        }
      )
    );
    this.subscriptions.add(
      this.moviesService.credits(this.id).subscribe(
        (result: any) => {
          this.credits = result.cast.length > 4 ? result.cast.splice(0, 4) : result.cast;
          console.log(this.credits);
        }
      )
    );
  }
  onSubmit() {
    let controls = Object.values(this.movieForm.controls);
    for(let control of controls) {
      if(control.invalid) {
        return;
      }
    }
    // update api code here
    this.router.navigate(['movies/movie', this.id]);
  }
  ngOnDestroy(): void {
    // unsubscribing from subscriptions on destroy
    this.subscriptions.unsubscribe();
  }
}
