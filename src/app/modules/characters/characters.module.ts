import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersComponent} from './characters.component';
import {CharacterCardComponent} from './components/character-card/character-card.component';
import {FindCharacterByIdPipe} from './pipes/find-character-by-id.pipe';


@NgModule({
    declarations: [
        CharactersComponent,
        CharacterCardComponent,
        FindCharacterByIdPipe
    ],
    exports: [
        CharactersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CharactersRoutingModule
    ]
})
export class CharactersModule {
}
