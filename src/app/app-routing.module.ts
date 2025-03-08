import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  {path: 'pokèmon/:pokemon', component:PokemonDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
