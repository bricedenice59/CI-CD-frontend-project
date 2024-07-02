import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {BehaviorSubject, Observable} from 'rxjs';
import {Joke} from "./model/joke.model";
import {JokesService} from "./services/jokes.service";

export class MockJokesService {
  mockJoke: Joke = {
    "joke": "C'est l'histoire du ptit dej, tu la connais ?",
    "response": "Pas de bol."
  };

  private subject: BehaviorSubject<Joke | null> = new BehaviorSubject<Joke | null>(this.mockJoke);

  // Simulates the getRandomJoke method without making an HTTP call
  public getRandomJoke(): void {
    // You can simulate delay with RxJS operators if needed
    this.subject.next(this.mockJoke);
  }

  // Returns an observable for the joke
  public joke$(): Observable<Joke | null> {
    return this.subject.asObservable();
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let jokesService: JokesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: JokesService, useClass: MockJokesService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    jokesService = TestBed.inject(JokesService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have joke$ as Observable<Joke | null>', () => {
    expect(component.joke$).toBeInstanceOf(Observable);
  });

  it('should call getRandomJoke on init', () => {
    const getRandomJokeSpy = spyOn(jokesService, 'getRandomJoke');
    fixture.detectChanges(); // ngOnInit is called
    expect(getRandomJokeSpy).toHaveBeenCalled();
  });
});
