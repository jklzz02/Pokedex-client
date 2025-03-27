import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSearchResultsComponent } from './pokemon-search-results.component';

describe('PokemonSearchResultsComponent', () => {
  let component: PokemonSearchResultsComponent;
  let fixture: ComponentFixture<PokemonSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
