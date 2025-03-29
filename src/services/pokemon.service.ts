import { Injectable } from '@angular/core';
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import { IPokemon } from '../interfaces/i-pokemon';
import { IPokemonList } from '../interfaces/i-pokemon-list';
import { forkJoin, from, map, mergeMap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPokemonSuggestion } from '../interfaces/i-pokemon-suggestion';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http:HttpClient) {}
  private API = new PokemonClient();
  private PokemonListAsset: string = 'assets/data/pokemon-list.json'

  getPokemonByName(name: string): Promise<IPokemon> {
    return this.API.getPokemonByName(name) as Promise<IPokemon>;
  }

  getPokemonById(id: number): Promise<IPokemon> {
    return this.API.getPokemonById(id) as Promise<IPokemon>;
  }

  getPokemonRange(
    minId: number = 0,
    maxId: number = 12
  ): Observable<IPokemonList[]> {
    return from(this.API.listPokemons(minId, maxId)).pipe(
      mergeMap((response) =>
        forkJoin(
          response.results.map((pokemonSummary: any) =>
            from(this.getPokemonByName(pokemonSummary.name)).pipe(
              map(
                (pokemonDetail) =>
                  ({
                    id: pokemonDetail.id,
                    name: pokemonDetail.name,
                    sprites: pokemonDetail.sprites,
                    types: pokemonDetail.types,
                  } as IPokemonList)
              )
            )
          )
        )
      )
    );
  }

  getPokemonListById (...ids: number[]): Observable<IPokemonList[]> {
    return forkJoin(
      ids.map( (id) => 
         from(this.getPokemonById(id))           
    ));
  }

  getPokemonSuggestionsList(): Observable<IPokemonSuggestion[]>{
    return this.http.get<IPokemonSuggestion[]>(this.PokemonListAsset);
  }

  getPokemonRangeBatch(startPages: number[], chunk: number): Observable<IPokemonList[][]> {
    const requests = startPages.map((start) => this.getPokemonRange(start, chunk));
    return forkJoin(requests);
  }

  getPokemonDetails(name: string): Observable<[Pokemon, PokemonSpecies]> {
    return forkJoin([
      from(this.API.getPokemonByName(name)),
      from(this.API.getPokemonSpeciesByName(name)),
    ]);
  }
}
