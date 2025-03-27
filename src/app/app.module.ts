import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { RadarComponent } from './radar/radar.component';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';
import { NotFoundComponent } from './not-found/not-found.component';
import { provideHttpClient } from '@angular/common/http';
import { PokemonSearchComponent } from './pokemon/pokemon-search/pokemon-search.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailComponent,
    PokemonListComponent,
    RadarComponent,
    NotFoundComponent,
    PokemonSearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BaseChartDirective, FormsModule],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
