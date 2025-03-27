import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonSuggestion } from '../../../interfaces/i-pokemon-suggestion';
import { CacheService } from '../../../services/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-search',
  standalone: false,
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.css'
})
export class PokemonSearchComponent implements OnInit{

  constructor(
    private pokemonservice: PokemonService,
    private cacheservice: CacheService,
    private router: Router
  )
  {}

  pokemonList: IPokemonSuggestion[] = [];
  suggestions: IPokemonSuggestion[] = [];
  searchInput: string = '';
  cacheKey: string = 'suggestion-list';

  ngOnInit(): void {
    this.fetchSuggestionsData();
  }

  onSearch(): void{

    if(!this.searchInput.length) {
      this.suggestions = [];
      return;
    }
    
    this.suggestions = this.pokemonList
                        .filter( pokemon => pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase().trim()))
                        .slice(0, 12);
  }

  fetchSuggestionsData(): void {

    if(this.cacheservice.has(this.cacheKey)) {
      this.pokemonList = this.cacheservice.get(this.cacheKey) as IPokemonSuggestion[];
      return;
    }

    this.pokemonservice
      .getPokemonSuggestionsList()
      .subscribe(
        (data) =>
          { 
            this.cacheservice
              .set(this.cacheKey, data.sort( (a,b) => a.name.localeCompare(b.name)));
              
            this.pokemonList = this.cacheservice.get(this.cacheKey) as IPokemonSuggestion[];
          });
  }

  submitSearch(): void 
  {
    if(!this.searchInput.length) {
      return;
    }

     this.router.navigateByUrl(`pokemons/search/${this.searchInput}`)
  }
}
