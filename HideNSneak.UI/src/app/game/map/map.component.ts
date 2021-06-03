import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
    NativeGeocoder,
    NativeGeocoderOptions,
    NativeGeocoderResult,
} from '@ionic-native/native-geocoder/ngx';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { MapSettings } from '../shared/models/map.model';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    @Input() public mapSettings: MapSettings = {
        latitude: 46.55465,
        longitude: 15.645881,
        zoom: 15,
        radius: 500,
    } as MapSettings;
    @Output() public mapSettingsChange = new EventEmitter<MapSettings>();

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
        private platform: Platform,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder
    ) {}

    ngOnInit() {
        this.platform.ready().then(() => {
            this.geoInformation();
        });
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            let watch = this.geolocation.watchPosition();
            watch
                .pipe(filter((p: any) => p.coords !== undefined))
                .subscribe((data: any) => {
                    setTimeout(() => {
                        this.mapSettings.latitude = data.coords.latitude;
                        this.mapSettings.longitude = data.coords.longitude;
                        this.mapSettings.accuracy = data.coords.accuracy;

                        this.cordsToAddress(
                            this.mapSettings.latitude,
                            this.mapSettings.longitude
                        );
                    }, 0);
                });
        });
    }

    public geoInformation() {
        from(this.geolocation.getCurrentPosition())
            .pipe(filter((p: any) => p.coords !== undefined))
            .subscribe((data) => {
                setTimeout(() => {
                    this.mapSettings.latitude = data.coords.latitude;
                    this.mapSettings.longitude = data.coords.longitude;
                    this.mapSettings.accuracy = data.coords.accuracy;

                    this.cordsToAddress(
                        this.mapSettings.latitude,
                        this.mapSettings.longitude
                    );
                }, 0);
            });
    }

    // reverse geocode
    public cordsToAddress(latitude, longitude) {
        from(
            this.nativeGeocoder.reverseGeocode(
                latitude,
                longitude,
                this.nativeGeocoderOptions
            )
        )
            .pipe(filter((p: any) => p.coords !== undefined))
            .subscribe((response: NativeGeocoderResult[]) => {
                this.mapSettings.address = this.createAddress(response[0]);
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
}
