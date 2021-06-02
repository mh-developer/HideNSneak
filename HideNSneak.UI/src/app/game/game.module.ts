import { NgModule } from '@angular/core';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        GameRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCAOeEoWx9bvSPGUyMQ_3lFFQc7HfxNYJk',
            libraries: ['places', 'geometry'],
        }),
    ],
})
export class GameModule {}
