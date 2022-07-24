import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from '../../interfaces/character.interface';

export type FavoriteAction = 'ADD' | 'REMOVE';

@Component({
  selector: 'as-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character | null;
  @Input() isFavorite: boolean;
  @Output() favoriteChanged: EventEmitter<{ action: FavoriteAction; id: number }>;

  constructor() {
    this.character = null;
    this.isFavorite = false;
    this.favoriteChanged = new EventEmitter();
  }

  ngOnInit(): void {
  }

  /**
   * Add or remove a character from favourites list
   *
   * @param id Character ID
   * @param action Remove or add action
   */
  toggleFavorite(id: number, action: FavoriteAction): void {
    this.favoriteChanged.emit({action, id});
  }

}
