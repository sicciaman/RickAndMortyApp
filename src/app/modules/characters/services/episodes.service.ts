import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, filter, forkJoin, map, Observable, of, switchMap, toArray} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) {
  }

  findById(url: string): Observable<string> {
    return this.http.get<Pick<any, 'name'>>(url).pipe(
        catchError(() => of({name: ''})),
        map(ep => ep.name)
    );
  }

  /**
   * Retrieve all episodes based on Url list passed
   *
   * @param episodes Url list
   */
  findAllEpisodesNames(episodes: string[]): Observable<string[]> {
    return forkJoin(episodes.map(ep => this.findById(ep))).pipe(
        switchMap(names => names),
        filter(name => !!name.length),
        toArray()
    );
  };
}
