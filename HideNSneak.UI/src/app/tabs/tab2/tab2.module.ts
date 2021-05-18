import { NgModule } from '@angular/core';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [SharedModule, Tab2PageRoutingModule],
    declarations: [Tab2Page],
})
export class Tab2PageModule {}
