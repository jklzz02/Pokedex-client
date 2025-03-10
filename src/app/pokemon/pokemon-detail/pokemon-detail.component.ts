import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from '../../../interfaces/i-pokemon';

@Component({
  selector: 'pokemon-detail',
  standalone: false,
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private pokemonservice:PokemonService){}

  pokemon:IPokemon | null = null;
  shiny:boolean = false;

  ngOnInit(): void {
    let pokemonName = this.route.snapshot.paramMap.get('pokemon');
    if(pokemonName) {
        this.pokemonservice.getPokemonByName(pokemonName)
                           .then( (data) => this.pokemon = data as IPokemon);
      }
  }

  showShiny(): void {
      this.shiny = !this.shiny;
  }
}