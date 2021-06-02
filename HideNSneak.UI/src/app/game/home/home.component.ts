import { Component, OnInit, NgZone } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { DropdownPage } from '../../shared/dropdown/dropdown/dropdown.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
    NativeGeocoder,
    NativeGeocoderOptions,
    NativeGeocoderResult,
} from '@ionic-native/native-geocoder/ngx';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public tab: string;
    public latitude: number = 46.55465;
    public longitude: number = 15.645881;
    public zoom: number = 15;
    public radius: number = 500;
    public styles: any;
    public address: any;
    public accuracy: any;

    public options = {
        timeout: 12000,
        maximumAge: 3600,
        enableHighAccuracy: true,
    };

    public nativeGeocoderOptions: NativeGeocoderOptions = {
        maxResults: 6,
        useLocale: true,
    };

    constructor(
        private popoverController: PopoverController,
        private platform: Platform,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder
    ) {}

    ngOnInit() {
        this.tab = 'game';
        this.platform.ready().then(() => {
            this.geoInformation();
        });
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            let watch = this.geolocation.watchPosition();
            watch.subscribe((data: any) => {
                this.latitude = data.coords.latitude;
                this.longitude = data.coords.longitude;
                this.cordsToAddress(this.latitude, this.longitude);
            });
        });
    }

    public geoInformation() {
        this.geolocation
            .getCurrentPosition()
            .then((data) => {
                this.latitude = data.coords.latitude;
                this.longitude = data.coords.longitude;
                this.accuracy = data.coords.accuracy;

                this.cordsToAddress(this.latitude, this.longitude);
            })
            .catch((error) => {
                alert(error);
            });
    }

    // reverse geocode
    public cordsToAddress(latitude, longitude) {
        this.nativeGeocoder
            .reverseGeocode(latitude, longitude, this.nativeGeocoderOptions)
            .then((response: NativeGeocoderResult[]) => {
                this.address = this.createAddress(response[0]);
            })
            .catch((error: any) => {
                alert(JSON.stringify(error));
            });
    }

    // Create address
    public createAddress(addressObject) {
        let object = [];
        let address = '';
        for (let key in addressObject) {
            object.push(addressObject[key]);
        }
        object.reverse();
        for (let val in object) {
            if (object[val].length) address += object[val] + ', ';
        }
        return address.slice(0, -2);
    }

    public async dropdown(event) {
        const popover = await this.popoverController.create({
            component: DropdownPage,
            cssClass: 'dropdown',
            event: event,
            translucent: true,
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
    }
}
