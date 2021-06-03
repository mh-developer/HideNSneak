import { NgModule } from '@angular/core';
import { NavigationRoutingModule } from './navigation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
    declarations: [NavigationComponent],
    imports: [SharedModule, NavigationRoutingModule],
})
export class NavigationModule {}
