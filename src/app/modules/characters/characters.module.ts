import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharactersRoutingModule} from './characters-routing.module';
import {CharactersComponent} from './characters.component';


@NgModule({
    declarations: [
        CharactersComponent
    ],
    exports: [
        CharactersComponent
    ],
    imports: [
        CommonModule,
        CharactersRoutingModule
    ]
})
export class CharactersModule {
}
