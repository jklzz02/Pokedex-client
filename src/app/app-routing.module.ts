import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PokemonSearchResultsComponent } from './pokemon/pokemon-search-results/pokemon-search-results.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons/1', pathMatch: 'full' },
  { path: 'pokemons/:page', component: PokemonListComponent },
  { path: 'pokemon/:pokemon', component: PokemonDetailComponent },
  { path: 'pokemons/search/:query', component: PokemonSearchResultsComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
