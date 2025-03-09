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

  constructor(private pokemonservice:PokemonService) {}

  ngOnInit() {

    this.pokemonservice.getPokemonRange(0, 12).then(data => this.pokemons = data);
    
  }
}
