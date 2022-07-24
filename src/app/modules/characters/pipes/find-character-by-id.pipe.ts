import {Pipe, PipeTransform} from '@angular/core';
import {Character} from '../interfaces/character.interface';

@Pipe({
  name: 'findCharacterById'
})
export class FindCharacterByIdPipe implements PipeTransform {

  transform(id: number, characters: Character[]): Character | null {
    return characters.find(c => c.id === id) ?? null;
  }

}
