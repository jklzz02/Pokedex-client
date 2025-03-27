import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-search-results',
  standalone: false,
  templateUrl: './pokemon-search-results.component.html',
  styleUrl: './pokemon-search-results.component.css'
})
export class PokemonSearchResultsComponent implements OnInit{

  title = 'Pokedex';

  constructor (
    private pokemonservice: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) 
  {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( (param) => {

      const query = param.get('query');
      
      if(!query?.length) {
        this.router.navigateByUrl("**");
      }

    });
  }

}
