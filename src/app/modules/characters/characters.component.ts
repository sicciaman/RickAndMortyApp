import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, tap} from 'rxjs';
import {CharactersService} from './services/characters.service';
import {Character} from './interfaces/character.interface';
import {Pagination} from '../../models/pagination';
import {FavoriteAction} from './components/character-card/character-card.component';
import {
    CharacterDetailsDialogComponent
} from './components/character-details-dialog/character-details-dialog.component';
import {Dialog} from '@angular/cdk/dialog';

@Component({
    selector: 'as-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
    // Search form control input
    characterInput: FormControl;

    // Query string for character name search
    query: string;

    // List of characters
    characters: Character[];

    // List of favorite characters IDs
    favorites: Set<number>;

    // Pagination info
    pagination: Pagination;

    constructor(private charactersService: CharactersService,
                private dialog: Dialog) {
        this.characterInput = new FormControl<string>('');
        this.query = '';
        this.characters = [];
        this.favorites = new Set<number>();
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.fetchCharacters();
        this.characterInput.valueChanges
            .pipe(
                debounceTime(500),
                tap((query) => {
                    // Clear pagination before new request
                    this.pagination.page = 1;
                    this.query = query;
                }),
            )
            .subscribe(() => {
                this.fetchCharacters();
            });
    }

    /**
     * Load characters list and pagination info
     */
    fetchCharacters(): void {
        this.charactersService.findAll(this.pagination, this.query).subscribe({
            next: (data) => {
                this.characters = data.results;
                this.pagination = {page: this.pagination.page, ...data.info};
            },
            error: (err) => {
                if (err.status === 404) {
                    this.characters = [];
                    this.pagination = new Pagination();
                }
            }
        });
    }

    /**
     * Change pagination page and reload characters list
     *
     * @param action Can be next or prev based on the button clicked by the user
     */
    changePage(action: 'prev' | 'next'): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        action === 'next' ? this.pagination.page++ : this.pagination.page--;
        this.fetchCharacters();
    }

    /**
     * Add or remove a character from favourites list
     *
     * @param characterID Character ID
     */
    toggleFavorite({id, action}: { id: number; action: FavoriteAction }): void {
        if (action === 'ADD') {
            if (this.favorites.has(id)) {
                alert('Character already in favorites');
                return;
            }
            this.favorites.add(id);
            console.log(`Character with ID ${id} added to favorites`);
        } else {
            this.favorites.delete(id);
            console.log(`Character with ID ${id} removed from favorites`);
        }
    }

    openCharacterDetails(character: Character): void {
        this.dialog.open(CharacterDetailsDialogComponent, {data: {character}, panelClass: 'character-dialog'});
    }
}
