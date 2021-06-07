import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public tab: string;

    @ViewChild('map', { static: false }) map: MapComponent;

    ionViewWillEnter() {
        this.tab = 'game';
        if (this.tab === 'game') {
            this.map?.onInit();
        }
    }

    ionViewWillLeave() {
        if (this.tab === 'game') {
            this.map?.onDestroy();
        }
    }
}
