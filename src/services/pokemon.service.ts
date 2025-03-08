import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { IPokemon } from '../interfaces/i-pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }
  private API = new PokemonClient();

  getPokemonRange(minId:number=0, maxId:number=10)
  {
    return this.API.listPokemons(minId, maxId);      
  }
}
