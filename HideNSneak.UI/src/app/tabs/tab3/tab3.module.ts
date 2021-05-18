import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        Tab3PageRoutingModule,
        RouterModule.forChild([{ path: '', component: Tab3Page }]),
    ],
    declarations: [Tab3Page],
})
export class Tab3PageModule {}
