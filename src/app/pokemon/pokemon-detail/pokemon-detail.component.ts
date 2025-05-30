import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPokemon } from '../../../interfaces/i-pokemon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-detail',
  standalone: false,
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent implements OnInit {
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private pokemonservice: PokemonService
  ) {}

  private descriptions: string[] = [];
  private uniqueDescriptions: string[] = [];
  private descriptionStart = 0;
  description:string = '';
  pokemon: IPokemon | null = null;
  shiny: boolean = false;
  buttonLabel = 'show shiny'

  ngOnInit(): void {

    let pokemonName = this.route.snapshot.paramMap.get('pokemon') ?? '';

      if (!pokemonName) {
        this.router.navigateByUrl('not-found')
      }

      this.pokemonservice.getPokemonDetails(pokemonName).subscribe((data) => {

        this.pokemon = data[0] as IPokemon;
        this.descriptions = data[1].flavor_text_entries
          .filter((flavor) => flavor.language.name.toLowerCase() == 'en')
          .map((x) => x.flavor_text);
        this.uniqueDescriptions = Array.from(new Set(this.descriptions));
        this.description = this.uniqueDescriptions[this.descriptionStart];
        this.title.setTitle(this.pokemon.name)
      }, 
      (error) => {
        console.log(error)
        this.router.navigateByUrl('not-found');
      });
    
  }

  showShiny(): void {
    this.shiny = !this.shiny;
    this.buttonLabel = this.shiny ? 'show shiny' : 'show normal';
  }

  nexDescription(): void{

      if(this.descriptionStart == this.uniqueDescriptions.length -1) {
        this.descriptionStart = 0;
      }
      ++this.descriptionStart;
      this.description = this.uniqueDescriptions[this.descriptionStart + 1];
    }

  previousDescription(): void{

    if(this.descriptionStart == 0) {
      this.descriptionStart = this.uniqueDescriptions.length;
    }

    --this.descriptionStart;
    this.description = this.uniqueDescriptions[this.descriptionStart -1];
  }
}
