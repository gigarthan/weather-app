import { NgModule } from '@angular/core';
import { WeatherTableComponent } from './weather-table/weather-table';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
	imports: [PipesModule],
	declarations: [WeatherTableComponent],
	exports: [WeatherTableComponent]
})
export class ComponentsModule {}
