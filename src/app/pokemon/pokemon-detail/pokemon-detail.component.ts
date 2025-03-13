import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from '../../../interfaces/i-pokemon';

@Component({
  selector: 'pokemon-detail',
  standalone: false,
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pokemonservice: PokemonService
  ) {}

  private descriptions: string[] = [];
  pokemon: IPokemon | null = null;
  uniqueDescriptions: Set<string> | null = null;
  shiny: boolean = false;
  buttonLabel = 'show shiny'

  ngOnInit(): void {

    let pokemonName = this.route.snapshot.paramMap.get('pokemon');
    if (pokemonName) {
      this.pokemonservice.getPokemonDetails(pokemonName).subscribe((data) => {
        this.pokemon = data[0] as IPokemon;
        this.descriptions = data[1].flavor_text_entries
          .filter((flavor) => flavor.language.name.toLowerCase() == 'en')
          .map((x) => x.flavor_text);
        this.uniqueDescriptions = new Set(this.descriptions);
      });
    }
    
  }

  showShiny(): void {
    this.shiny = !this.shiny;
    this.buttonLabel = this.shiny ? 'show shiny' : 'show normal';
  }
}
