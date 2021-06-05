import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
    NativeGeocoder,
    NativeGeocoderOptions,
    NativeGeocoderResult,
} from '@ionic-native/native-geocoder/ngx';
import { filter, takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { MapSettings } from '../shared/models/map.model';
import { GameService } from './../shared/game.service';

@Component({
    selector: 'app-game-settings',
    templateUrl: './game-settings.component.html',
    styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit, OnDestroy {
    public mapSettings: MapSettings = {
        latitude: 46.55465,
        longitude: 15.645881,
        zoom: 15,
        radius: 500,
        playerRadius: 50,
    } as MapSettings;

    public selectedColor = 0;
    public colorOptions = [
        { key: 'primary', value: '#1FBAD6' },
        { key: 'secondary', value: '#3dc2ff' },
        { key: 'tertiary', value: '#5260ff' },
        { key: 'success', value: '#2dd36f' },
        { key: 'warning', value: '#ffc409' },
        { key: 'light', value: '#f4f5f8' },
        { key: 'medium', value: '#92949c' },
        { key: 'dark', value: '#222428' },
    ];

    public nativeGeocoderOptions: NativeGeocoderOptions = {
        maxResults: 6,
        useLocale: true,
    };

    private unsubscribe$ = new Subject<void>();

    constructor(
        private platform: Platform,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private gameService: GameService
    ) {}

    ngOnInit() {
        this.platform.ready().then(() => {
            this.geoInformation();
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadLocation() {}

    public save() {}

    public geoInformation() {
        from(this.geolocation.getCurrentPosition())
            .pipe(
                filter((p: any) => p.coords !== undefined),
                takeUntil(this.unsubscribe$)
            )
            .subscribe((data) => {
                this.setLocationData(data);
            });
    }

    public cordsToAddress(latitude, longitude) {
        if (this.platform.is('cordova'))
            this.nativeGeocoder
                .reverseGeocode(latitude, longitude, this.nativeGeocoderOptions)
                .then((response: NativeGeocoderResult[]) => {
                    this.mapSettings.address = this.createAddress(response[0]);
                });
    }

    private createAddress(addressObject) {
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

    private setLocationData(data) {
        setTimeout(() => {
            this.mapSettings.latitude = data.coords.latitude;
            this.mapSettings.longitude = data.coords.longitude;
            this.mapSettings.accuracy = data.coords.accuracy;

            this.cordsToAddress(
                this.mapSettings.latitude,
                this.mapSettings.longitude
            );
        }, 0);
    }

    public markerDragEnd($event: any) {
        this.mapSettings.latitude = $event.latLng.lat();
        this.mapSettings.longitude = $event.latLng.lng();
        this.cordsToAddress(
            this.mapSettings.latitude,
            this.mapSettings.longitude
        );
    }
}
