import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../interfaces/i-pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'Pokedex';
  pokemons:IPokemon[] = [];

  constructor(private pokemonservice:PokemonService) {}

  ngOnInit(): void {

    this.pokemonservice.getPokemonRange()
                        .then( (data) => {this.pokemons = data.results as unknown as IPokemon[]; console.log(this.pokemons); });    
  }
}
