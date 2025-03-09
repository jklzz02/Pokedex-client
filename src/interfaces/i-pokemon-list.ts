import { Sprites, Type } from "./i-pokemon";

export interface IPokemonList {
    id:number;
    name:string;
    sprites:Sprites;
    types:Type[];
}
