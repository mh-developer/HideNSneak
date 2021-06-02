import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DropdownPage } from '../../shared/dropdown/dropdown/dropdown.page';
import { AuthService } from '../../auth/shared/auth.service';
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
    tab: string;
    tab2: string;
    title: string = 'HideNSeek project';
    latitude: number = 46.55465;
    longitude: number = 15.645881;
    zoom: number = 6;
    styles: any;

    lat: any;
    long: any;
    address: any;
    accuracy: any;

    constructor(
        public router: Router,
        public popoverController: PopoverController,
        private authService: AuthService,

        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder
    ) {
        this.tab = 'create';
        this.tab2 = 'all';
    }

    ngOnInit() {}

    options = {
        timeout: 12000,
        maximumAge: 3600,
        enableHighAccuracy: true,
    };

    geoInformation() {
        this.geolocation
            .getCurrentPosition()
            .then((data) => {
                this.lat = data.coords.latitude;
                this.long = data.coords.longitude;
                this.accuracy = data.coords.accuracy;

                this.cordsToAddress(this.lat, this.long);
            })
            .catch((error) => {
                alert(error);
            });
    }

    // geocoder options
    nativeGeocoderOptions: NativeGeocoderOptions = {
        maxResults: 6,
        useLocale: true,
    };

    // reverse geocode
    cordsToAddress(lat, long) {
        this.nativeGeocoder
            .reverseGeocode(lat, long, this.nativeGeocoderOptions)
            .then((response: NativeGeocoderResult[]) => {
                this.address = this.createAddress(response[0]);
            })
            .catch((error: any) => {
                alert(JSON.stringify(error));
            });
    }

    // Create address
    createAddress(addressObject) {
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

    async dropdown(event) {
        const popover = await this.popoverController.create({
            component: DropdownPage,
            cssClass: 'dropdown',
            event: event,
            translucent: true,
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
    }

    logout() {
        this.router.navigateByUrl('/login', { replaceUrl: true });
        this.authService.purgeAuth();
    }
}
