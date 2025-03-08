import { Component } from '@angular/core';
import { IPokemon } from '../../../interfaces/i-pokemon';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  title = 'Pokedex';
  pokemons:IPokemon[] = [];

  constructor(private pokemonservice:PokemonService) {}

  ngOnInit() {

    this.pokemonservice.getPokemonRange(0, 12).then(data => this.pokemons = data);
    
  }
}
