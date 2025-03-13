import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { IPokemon } from '../../interfaces/i-pokemon';

@Component({
  selector: 'app-radar',
  standalone: false,
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.css',
})
export class RadarComponent implements OnChanges{

  @Input()
  pokemon:IPokemon | null = null;
  title = 'pokemon-stats-char';
  radarChartOptions: ChartConfiguration<'radar'>['options'] = { responsive: true,};
  radarChartLabels: string[] = [];
  radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["pokemon"] != null && changes["pokemon"] != undefined)
    {
      let statsName = this.pokemon?.stats.map(x => x.stat.name) ?? [];
      let statValue = this.pokemon?.stats.map(x => x.base_stat) ?? [];
      this.radarChartLabels = statsName;
      this.radarChartDatasets = [{ data: statValue, label: this.pokemon?.name +'\'s stats' },];
    }
  }

}
