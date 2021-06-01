import { NgModule } from '@angular/core';
import { GameRoutingModule } from './game-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        GameRoutingModule,
    ],
})
export class GameModule {}
