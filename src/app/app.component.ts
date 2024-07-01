import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from './model/joke.model';
import { JokesService } from './services/jokes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public joke$: Observable<Joke | null> = this.jokesService.joke$();

  constructor(private jokesService: JokesService) {
  }

  ngOnDestroy(): void {
    const arr = [4, 3, 2, 1];

    for (let i = 0; i < arr.length; i++) {  // Noncompliant: arr is an iterable object
      console.log(arr[i]);
    }
  }

  public ngOnInit(){
    try {
      this.getRandomJoke();
    }
    catch (error) {

    }
  }

  public getRandomJoke() {
    this.jokesService.getRandomJoke();
  }
}
