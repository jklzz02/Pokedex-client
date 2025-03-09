import { Component } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonList } from '../../../interfaces/i-pokemon-list';

@Component({
  selector: 'pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  title = 'Pokedex';
  pokemons:IPokemonList[] = [];
  start:number = 0;
  chunk:number = 12;

  constructor(private pokemonservice:PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  next() {
    this.start += 12;
    this.loadPokemons();
  }

  previous() {
    if(this.start < 12) return;
    this.start -= 12;
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonservice.getPokemonRange(this.start, this.chunk).subscribe( (data) => this.pokemons = data );
  }
}
