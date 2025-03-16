import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons/1', pathMatch: 'full' },
  { path: 'pokemons/:page', component: PokemonListComponent },
  { path: 'pokemon/:pokemon', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
