import { Component } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonList } from '../../../interfaces/i-pokemon-list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {

  title = 'Pokedex';
  pokemons: IPokemonList[] = [];
  lastPage: number = 85;
  firstPage: number = 1;
  start: number = 0;
  chunk: number = 12;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonservice: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {

    this.start = (Number(this.route.snapshot.paramMap.get('page')) ?? 1);
    this.start = this.start == 1 ? 0 : this.start * this.chunk;

    this.route.paramMap.subscribe((params) => {
      this.start = (Number(params.get('page')) ?? 1);
      this.start = this.start === this.firstPage ? 0 : this.start * this.chunk;
  
      this.loading = true;
      this.loadPokemons();
    });
  }

  next() {
    let  nextPage = this.start / this.chunk + 1;

    if(nextPage == 1) {
      nextPage++;
    }

    if(nextPage > this.lastPage) {
      nextPage = this.firstPage;
    }
    
    this.router.navigateByUrl(`pokemons/${nextPage}`);
  }
  
  previous() {
    const prevPage = this.start === 0 ? this.lastPage : Math.max(1, this.start / this.chunk -1);
    this.router.navigateByUrl(`pokemons/${prevPage}`);
  }

  loadPokemons() {

    this.pokemonservice
      .getPokemonRange(this.start, this.chunk)
      .subscribe((data) => {
        this.pokemons = data
        this.loading = false;
      });
  }
}
