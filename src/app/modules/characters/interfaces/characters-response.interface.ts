import {Character} from './character.interface';
import {Pagination} from '../../../models/pagination';

export interface CharactersResponse {
    info: Pick<Pagination, 'pages' | 'count' | 'next' | 'prev'>;
    results: Character[];
}
