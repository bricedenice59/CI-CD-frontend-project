import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokesService } from './jokes.service';
import {Joke} from "../model/joke.model";

describe('JokesService', () => {
  let service: JokesService;
  let httpTestingController: HttpTestingController;

  const mockJoke: Joke = {
    "joke": "C'est l'histoire du ptit dej, tu la connais ?",
    "response": "Pas de bol."
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });
    service = TestBed.inject(JokesService);
    httpTestingController = TestBed.inject(HttpTestingController);

    // Expect the initial request made by the constructor
    const req = httpTestingController.expectOne(service['pathService']);
    req.flush(mockJoke);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getRandomJoke should fetch a random joke', () => {
    // No need to call getRandomJoke() since it's called in the constructor

    // Expect no additional requests after the initial one
    httpTestingController.expectNone(service['pathService']);

    // Test the joke$ observable for the initial joke
    service.joke$().subscribe(joke => {
      expect(joke).toEqual(mockJoke);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
