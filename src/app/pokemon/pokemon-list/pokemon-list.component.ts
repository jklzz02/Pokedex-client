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
  private cacheStart:number = 0;
  private cacheCount:number = 0;
  title = 'Pokedex';
  pokemons: IPokemonList[] = [];
  start: number = 0;
  chunk: number = 12;
  loading: boolean = true;
  pokemonRefreshSubject = new Subject<boolean>();

  constructor(private pokemonservice: PokemonService) {}

  ngOnInit() {
    this.pokemonRefreshSubject.subscribe({
      next: (forward:boolean) => {
        this.loading = true;
        this.loadPokemons(forward);
      },
    });
    this.pokemonRefreshSubject.next(true);
  }

  next() {
    this.start += 12;
    this.pokemonRefreshSubject.next(true);
  }

  previous() {
    if (this.start < 12) return;
    this.start -= 12;
    this.pokemonRefreshSubject.next(false);
  }

  loadPokemons(forward:boolean) {

    /**
     * TO DO
     * change logic to adapt to thw concat version of the cache
     */
    if(this.cacheCount > 0) {

      if(forward){
        if(!((this.cacheStart + this.chunk) > this.cache.length))
        {
          this.cacheStart += this.chunk;
        }
        this.pokemons = this.cache.slice(this.cacheStart, this.cacheStart + this.chunk);
      }else{

        if(!((this.cacheStart - this.chunk) > this.cache.length))
        {
            this.cacheStart -= this.chunk;
        }
        this.pokemons = this.cache.slice(this.cacheStart, this.cacheStart + this.chunk);
      }

      this.loading = false;
      --this.cacheCount;
      return;
    }

    this.cacheCount = 5;
    this.pokemonservice
      .getPokemonRange(this.start, this.chunk*5)
      .subscribe((data) => {
        /**
         * TO DO
         * try to use concat, the cache needs to grow instead of being overwritten
         */
        this.cache = data
        this.pokemons = this.cache.slice(this.cacheStart, this.cacheStart + this.chunk)
        this.loading = false;
      });
  }
}
