import {Component, Inject, OnInit} from '@angular/core';
import {Character} from '../../interfaces/character.interface';
import {DIALOG_DATA} from '@angular/cdk/dialog';
import {EpisodesService} from '../../services/episodes.service';

export interface CharactersDialogInput {
  character: Character;
}

@Component({
  selector: 'as-character-details-dialog',
  templateUrl: './character-details-dialog.component.html',
  styleUrls: ['./character-details-dialog.component.scss']
})
export class CharacterDetailsDialogComponent implements OnInit {
  character: Character | null;
  episodes: string[];
  detailsKV: Map<string, any>;

  constructor(@Inject(DIALOG_DATA) {character}: CharactersDialogInput,
              private episodesService: EpisodesService) {
    this.character = character;
    this.episodes = [];
    const {id, created, episode, gender, species, type} = character;
    this.detailsKV = new Map()
        .set('ID', id)
        .set('Created date', new Date(created).toLocaleString())
        .set('Gender', gender)
        .set('Species', species)
        .set('Type', type);
  }

  ngOnInit(): void {
    if (this.character?.episode) {
      this.episodesService.findAllEpisodesNames(this.character?.episode).subscribe((episodesNames) => {
        console.log(episodesNames);
        this.episodes = episodesNames;
      });
    }
  }

}
