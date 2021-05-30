import { NgModule } from '@angular/core';
import { Tab1Page } from './tab1.page';
import { AgmCoreModule } from '@agm/core';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        Tab1PageRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDH9f22f9ww7MET1bBk1isp2gG-6tDnnXE',
            libraries: ['places'],
        }),
    ],
    declarations: [Tab1Page],
})
export class Tab1PageModule {}
