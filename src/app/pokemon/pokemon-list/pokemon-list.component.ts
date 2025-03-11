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
    this.pokemonservice
      .getPokemonRange(this.start, this.chunk)
      .subscribe((data) => {
        this.pokemons = data;
        this.loading = false;
      });
  }
}
