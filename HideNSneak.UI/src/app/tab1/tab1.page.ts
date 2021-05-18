import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DropdownPage } from '../dropdown/dropdown.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  tab: string;
  tab2: string;
  title: string = 'HideNSeek project';
  latitude: number = 46.554650;
  longitude: number = 15.645881;
  zoom: number = 6;
  constructor(public router: Router, public popoverController: PopoverController) {
    this.tab = 'create';
    this.tab2 = 'all';
  }


  async dropdown(event) {
    const popover = await this.popoverController.create({
      component: DropdownPage,
      cssClass: 'dropdown',
      event: event,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
