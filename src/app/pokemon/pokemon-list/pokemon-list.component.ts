import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { IPokemonList } from '../../../interfaces/i-pokemon-list';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../../../services/cache.service';

@Component({
  selector: 'pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent implements OnInit, OnDestroy {

  title = 'Pokedex';
  pokemons: IPokemonList[] = [];
  lastPage: number = 85;
  firstPage: number = 1;
  start: number = 0;
  chunk: number = 12;
  loading: boolean = true;
  totalPagesToCache: number = 16;


  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const page = Number(params.get('page')) ?? this.firstPage;

      if(Number.isNaN(page) || page < this.firstPage || page > this.lastPage){
        this.router.navigateByUrl('not-found');
      }

      this.start = page === this.firstPage ? 0 : page * this.chunk;
      this.loading = true;
      this.loadPokemons(page);
    });
  }

  next() {
    let nextPage = this.start / this.chunk + 1;
    if (nextPage == 1) {
      nextPage++;
    }
    if (nextPage > this.lastPage) {
      nextPage = this.firstPage;
    }
    this.router.navigateByUrl(`pokemons/${nextPage}`);
  }

  previous() {
    const prevPage = this.start === 0 ? this.lastPage : Math.max(1, this.start / this.chunk - 1);
    this.router.navigateByUrl(`pokemons/${prevPage}`);
  }

  loadPokemons(currentPage: number) {
    const cacheKey = `pokemons-${currentPage}`;

    const cachedData = this.cacheService.get(cacheKey);
    if (cachedData) {
      this.pokemons = cachedData;
      this.loading = false;
    } else {
      this.prefetchPages(currentPage);
    }
  }

  prefetchPages(startPage: number) {
    const pagesToFetch = new Set<number>();
    const previousPagesToCache = 4;
    const nextPagesToCache = this.totalPagesToCache - previousPagesToCache

    pagesToFetch.add(startPage);
  
    for (let i = 1; i <= previousPagesToCache; i++) {
      let prevPage = startPage - i;
      if (prevPage < this.firstPage) {
        prevPage = this.lastPage - (this.firstPage - prevPage - 1);
      }
      pagesToFetch.add(prevPage);
    }
  
    for (let i = 1; i <= nextPagesToCache; i++) {
      let nextPage = startPage + i;
      if (nextPage > this.lastPage) {
        nextPage = this.firstPage + (nextPage - this.lastPage - 1);
      }
      pagesToFetch.add(nextPage);
    }
  
    const pagesArray = Array.from(pagesToFetch).sort((a, b) => a - b);
    const pagesStartIndexes = pagesArray.map(page => (page === this.firstPage ? 0 : page * this.chunk));
  
    this.pokemonService.getPokemonRangeBatch(pagesStartIndexes, this.chunk).subscribe((data) => {
      data.forEach((pokemons, index) => {
        const pageNumber = pagesArray[index];
        const cacheKey = `pokemons-${pageNumber}`;
        this.cacheService.set(cacheKey, pokemons);
      });
  
      this.pokemons = this.cacheService.get(`pokemons-${startPage}`) || [];
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.cacheService.dispose();
  }
}