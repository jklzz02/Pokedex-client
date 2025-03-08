import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { IPokemon } from '../interfaces/i-pokemon';
import { IPokemonList } from '../interfaces/i-pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }
  private API = new PokemonClient();


  getPokemonByName(name:string): Promise<IPokemon> {
    return this.API.getPokemonByName(name) as Promise<IPokemon>;
  }

  async getPokemonRange(minId: number = 0, maxId: number = 10): Promise<IPokemon[]> {
    const data = await this.API.listPokemons(minId, maxId);
    
    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemonSummary) => {
        const pokemonDetail = await this.API.getPokemonByName(pokemonSummary.name);
        return {
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          sprites: pokemonDetail.sprites,
          types: pokemonDetail.types
        } as IPokemon;
      })
    );
  
    return detailedPokemons;
  }
}
