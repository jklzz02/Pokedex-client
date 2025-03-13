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

  private cache:IPokemonList[] = []
  private cacheCount = 0;
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

    if(this.cacheCount > 1) {
      this.pokemons = this.cache.slice(this.start, this.start + this.chunk);
      this.loading = false;
      this.cacheCount --;
      return;
    }

    this.pokemonservice
      .getPokemonRange(this.start, this.chunk*4)
      .subscribe((data) => {
        this.cache = data;
        this.pokemons = this.cache.slice(this.start, this.start + this.chunk)
        this.loading = false;
        this.cacheCount = 4;
      });
  }
}
