import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropdownPageRoutingModule } from './dropdown-routing.module';

import { DropdownPage } from './dropdown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropdownPageRoutingModule
  ],
  declarations: [DropdownPage]
})
export class DropdownPageModule {}
