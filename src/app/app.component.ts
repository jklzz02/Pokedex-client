import { Component, OnInit } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { IPokemon } from '../interfaces/i-pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'Pokedex';
  pokemon:IPokemon | null = null;

  ngOnInit(): void {
      const api = new PokemonClient();
    
      api
      .getPokemonByName('luxray')
      .then((data) => this.pokemon = data as IPokemon)
  }
}
