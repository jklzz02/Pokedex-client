import { Injectable } from '@angular/core';
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import { IPokemon } from '../interfaces/i-pokemon';
import { IPokemonList } from '../interfaces/i-pokemon-list';
import { forkJoin, from, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}
  private API = new PokemonClient();

  getPokemonByName(name: string): Promise<IPokemon> {
    return this.API.getPokemonByName(name) as Promise<IPokemon>;
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

  getPokemonDetails(name: string): Observable<[Pokemon, PokemonSpecies]> {
    return forkJoin([
      from(this.API.getPokemonByName(name)),
      from(this.API.getPokemonSpeciesByName(name)),
    ]);
  }
}
