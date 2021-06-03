import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DropdownPage } from '../../shared/dropdown/dropdown/dropdown.page';
import { MapComponent } from './../map/map.component';
import { MapSettings } from '../shared/models/map.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public tab: string;
    public mapSettings: MapSettings = {
        latitude: 46.55465,
        longitude: 15.645881,
        zoom: 15,
        radius: 500,
    } as MapSettings;

    @ViewChild('map', { static: true }) map: MapComponent;

    constructor(private popoverController: PopoverController) {}

    ngOnInit() {
        this.tab = 'game';
    }

    public async dropdown(event) {
        const popover = await this.popoverController.create({
            component: DropdownPage,
            cssClass: 'dropdown',
            event: event,
            translucent: true,
        });
        await popover.present();

        await popover.onDidDismiss();
    }
}
