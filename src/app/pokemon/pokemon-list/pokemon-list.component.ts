import { Component } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonList } from '../../../interfaces/i-pokemon-list';
import { Subject } from 'rxjs';

@Component({
  selector: 'pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {

  private cache:IPokemonList[] = [];
  title = 'Pokedex';
  pokemons: IPokemonList[] = [];
  start: number = 0;
  chunk: number = 12;
  loading: boolean = true;
  pokemonRefreshSubject = new Subject<void>();

  constructor(private pokemonservice: PokemonService) {}

  ngOnInit() {
    this.pokemonRefreshSubject.subscribe({
      next: () => {
        this.loading = true;
        this.loadPokemons();
      },
    });
    this.pokemonRefreshSubject.next();
  }

  next() {
    this.start += 12;
    this.pokemonRefreshSubject.next();
  }

  previous() {
    if (this.start < 12) return;
    this.start -= 12;
    this.pokemonRefreshSubject.next();
  }

  loadPokemons() {

    /**
     * TO DO
     * review logic thoroughly to ensure that the cache
     * works as intended
     */

    if(this.start + this.chunk < this.cache.length){
      
      this.pokemons = this.cache.slice(this.start, this.start + this.chunk);
      this.loading = false;
      return;
    }

    this.pokemonservice
      .getPokemonRange(this.start, this.chunk*5)
      .subscribe((data) => {
        /**
         * TO DO
         * refactor the code in a cleaner way
         */
        this.cache = this.cache.concat(data);
        this.cache = Array.from(new Set(this.cache));
        this.pokemons = this.cache.slice(this.start, this.start + this.chunk)
        this.loading = false;
      });
  }
}