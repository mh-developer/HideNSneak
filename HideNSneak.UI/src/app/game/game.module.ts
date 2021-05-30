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
            apiKey: 'AIzaSyDH9f22f9ww7MET1bBk1isp2gG-6tDnnXE',
            libraries: ['places'],
        }),
    ],
})
export class GameModule {}
