import { NgModule } from '@angular/core';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from './../../environments/environment';

@NgModule({
    declarations: [HomeComponent, MapComponent],
    imports: [
        SharedModule,
        GameRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.MAP_API_KEY,
            libraries: ['places', 'geometry'],
        }),
    ],
})
export class GameModule {}
