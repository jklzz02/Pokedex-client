import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonSuggestion } from '../../../interfaces/i-pokemon-suggestion';
import { IPokemonList } from '../../../interfaces/i-pokemon-list';

@Component({
  selector: 'app-pokemon-search-results',
  standalone: false,
  templateUrl: './pokemon-search-results.component.html',
  styleUrl: './pokemon-search-results.component.css'
})
export class PokemonSearchResultsComponent implements OnInit {

  title = 'Pokedex';

  constructor (
    private pokemonservice: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {}

  query: string = '';
  pokemonList: IPokemonSuggestion[] = [];
  searchResults: IPokemonList[] = [];
  loading: boolean =  true;

  ngOnInit(): void {
    this.route.paramMap.subscribe( (param) => {

      const query = param.get('query');
      this.query = query ?? '';

      if(!this.query?.length) {
        this.router.navigateByUrl("**");
      }

      this.getSearchResults();
    });
  }

  getSearchResults (): void {

  this.pokemonservice.getPokemonSuggestionsList().subscribe( (data) => 
    {
      this.pokemonList = data
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(pokemon => pokemon.name.toLowerCase().includes(this.query.toLowerCase().trim()))
            .slice(0, 24) as IPokemonSuggestion[];

      if(!this.pokemonList.length) {
        this.loading = false;
        return;
      }

      this.pokemonservice.getPokemonListById(...this.pokemonList.map(pokemon => pokemon.id)).subscribe( (data) => {
              this.searchResults = data;
              this.loading = false;
            }
          )
    });
  }
}
