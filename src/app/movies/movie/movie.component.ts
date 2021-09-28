import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  // list of popular movies
  movie: any = null;
  credits = [];
  id = null;
  // loading
  isLoading = true;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // getting the id of movies requested
    this.id = this.route.snapshot.params.id;
    this.subscriptions.add(
      this.moviesService.one(this.id).subscribe(
        result => {
          this.isLoading = false;
          this.movie = result;
          console.log(result);
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
  onEditMovie() {
    this.router.navigate(['movies/edit-movie', this.id]);
  }
  ngOnDestroy(): void {
    // unsubscribing from subscriptions on destroy
    this.subscriptions.unsubscribe();
  }

}
