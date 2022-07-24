import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pagination} from '../../../models/pagination';
import {CharactersResponse} from '../interfaces/characters-response.interface';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  charactersApiUrl: string;

  constructor(private http: HttpClient) {
    this.charactersApiUrl = environment.rickAndMortyUrl + '/character';
  }

  /**
   * Retrieve all Rick&Morty characters as a paginated resource
   */
  findAll(pagination: Pagination, query?: string): Observable<CharactersResponse> {
    let params = new HttpParams()
        .append('page', pagination.page);
    if (query) {
      params = params.append('name', query);
    }
    return this.http.get<CharactersResponse>(this.charactersApiUrl, {params});
  }
}
