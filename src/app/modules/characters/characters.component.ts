import {Component, OnInit} from '@angular/core';
import {CharactersService} from './characters.service';
import {Character} from './interfaces/character.interface';
import {Pagination} from '../../models/pagination';

@Component({
  selector: 'as-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: Character[];
  pagination: Pagination;

  constructor(private charactersService: CharactersService) {
    this.characters = [];
    this.pagination = new Pagination();
  }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.charactersService.findAll(this.pagination).subscribe((data) => {
      this.characters = data.results;
      this.pagination = {page: this.pagination.page, ...data.info};
    });
  }

  changePage(action: 'prev' | 'next'): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    action === 'next' ? this.pagination.page++ : this.pagination.page--;
    this.fetchCharacters();
  }

}
