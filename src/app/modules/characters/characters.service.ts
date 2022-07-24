import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pagination} from '../../models/pagination';
import {CharactersResponse} from './interfaces/characters-response.interface';
import {environment} from '../../../environments/environment';

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
  findAll(pagination: Pagination): Observable<CharactersResponse> {
    const params = new HttpParams()
        .append('page', pagination.page);
    return this.http.get<CharactersResponse>(this.charactersApiUrl, {params});
  }
}
