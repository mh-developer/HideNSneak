import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import {
    NativeGeocoder,
    NativeGeocoderOptions,
    NativeGeocoderResult,
} from '@ionic-native/native-geocoder/ngx';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MapSettings } from '../shared/models/map.model';
import { colorOptions } from '../shared/models/game.model';
import { GameService } from './../shared/game.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
    selector: 'app-game-settings',
    templateUrl: './game-settings.component.html',
    styleUrls: ['./game-settings.component.scss'],
    providers: [NativeGeocoder],
})
export class GameSettingsComponent implements OnInit, OnDestroy {
    public mapSettings: MapSettings = {
        latitude: 46.55465,
        longitude: 15.645881,
        zoom: 15,
        radius: 500,
        playerRadius: 50,
    } as MapSettings;

    public selectedColor: number = 0;
    public colorOptions: any[] = colorOptions;

    public nativeGeocoderOptions: NativeGeocoderOptions = {
        maxResults: 6,
        useLocale: true,
    };

    private geosubscribe: any;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private platform: Platform,
        private nativeGeocoder: NativeGeocoder,
        private toastController: ToastController,
        private authService: AuthService,
        private gameService: GameService
    ) {}

    ngOnInit() {
        this.loadLocation();
    }

    ngOnDestroy() {
        window.navigator.geolocation.clearWatch(this.geosubscribe);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadLocation() {
        this.gameService
            .getAllLocations()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                if (data) {
                    const location = data.find(
                        (x) => x.userId === this.authService.getUserId()
                    );
                    if (location) {
                        this.mapSettings = location;
                        this.selectedColor = this.colorOptions.findIndex(
                            (x) => x.key === this.mapSettings.color?.key
                        );
                    } else {
                        this.platform.ready().then(() => {
                            this.geoInformation();
                        });
                    }
                }
            });
    }

    public save() {
        this.mapSettings.color = this.colorOptions[this.selectedColor];

        if (this.mapSettings?.id) {
            this.gameService
                .updateLocation(this.mapSettings?.id, this.mapSettings)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    (data) => {
                        this.showSuccess();
                    },
                    (err) => {
                        this.showError(err);
                    }
                );
        } else {
            this.gameService
                .createLocation(this.mapSettings)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    (data) => {
                        this.mapSettings = data;
                        this.showSuccess();
                    },
                    (err) => {
                        this.showError(err);
                    }
                );
        }
    }

    public geoInformation() {
        this.geosubscribe = window.navigator.geolocation.getCurrentPosition(
            (data) => {
                this.setLocationData(data);
            }
        );
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

    public markerDragEnd(event: any) {
        this.mapSettings.latitude = event?.coords?.lat;
        this.mapSettings.longitude = event?.coords?.lng;
        this.cordsToAddress(
            this.mapSettings.latitude,
            this.mapSettings.longitude
        );
    }

    private async showSuccess() {
        const toast = await this.toastController.create({
            message: 'Successful saved.',
            duration: 1500,
            color: 'success',
        });
        toast.present();
    }

    private async showError(err) {
        const toast = await this.toastController.create({
            message: 'Something went wrong. Please try again.',
            duration: 3000,
            color: 'danger',
        });
        toast.present();
    }
}
