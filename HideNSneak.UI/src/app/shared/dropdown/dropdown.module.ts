import { NgModule } from '@angular/core';
import { DropdownPageRoutingModule } from './dropdown-routing.module';
import { DropdownPage } from './dropdown/dropdown.page';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [SharedModule, DropdownPageRoutingModule],
    declarations: [DropdownPage],
})
export class DropdownPageModule {}
