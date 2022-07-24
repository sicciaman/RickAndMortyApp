import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from '@angular/cdk/dialog';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersComponent} from './characters.component';
import {CharacterCardComponent} from './components/character-card/character-card.component';
import {FindCharacterByIdPipe} from './pipes/find-character-by-id.pipe';
import {
    CharacterDetailsDialogComponent
} from './components/character-details-dialog/character-details-dialog.component';


@NgModule({
    declarations: [
        CharactersComponent,
        CharacterCardComponent,
        FindCharacterByIdPipe,
        CharacterDetailsDialogComponent
    ],
    exports: [
        CharactersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        CharactersRoutingModule
    ]
})
export class CharactersModule {
}
