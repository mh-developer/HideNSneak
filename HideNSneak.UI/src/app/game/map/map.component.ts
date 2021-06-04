import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
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
import { PlayerLocation } from '../shared/models/game.model';
import { GameService } from './../shared/game.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
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

    public playersLocations: PlayerLocation[] = [];

    private unsubscribe$ = new Subject<void>();

    constructor(
        private platform: Platform,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private gameService: GameService
    ) {}

    ngOnInit() {
        this.platform.ready().then(() => {
            let watch = this.geolocation.watchPosition(this.options);
            watch
                .pipe(filter((p: any) => p.coords !== undefined))
                .subscribe((data: any) => {
                    this.setLocationData(data);
                });
        });

        this.gameService
            .getPlayersLocations()
            .bind('ping', (data: PlayerLocation) => {
                if (
                    this.playersLocations.some(
                        (player: PlayerLocation) =>
                            player.userId === data.userId
                    )
                ) {
                    const playerToReplace = this.playersLocations.findIndex(
                        (i) => i.userId === data.userId
                    );

                    this.playersLocations.splice(playerToReplace, 1);
                }
                this.playersLocations.push(data);
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

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

    // reverse geocode
    public cordsToAddress(latitude, longitude) {
        from(
            this.nativeGeocoder.reverseGeocode(
                latitude,
                longitude,
                this.nativeGeocoderOptions
            )
        )
            .pipe(
                filter((p: any) => p.coords !== undefined),
                takeUntil(this.unsubscribe$)
            )
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

    private setLocationData(data) {
        setTimeout(() => {
            this.mapSettings.latitude = data.coords.latitude;
            this.mapSettings.longitude = data.coords.longitude;
            this.mapSettings.accuracy = data.coords.accuracy;

            let location = {
                lat: this.mapSettings.latitude,
                lng: this.mapSettings.longitude,
            } as PlayerLocation;

            this.gameService
                .pingLocation(location)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((ping) => ping);

            this.cordsToAddress(
                this.mapSettings.latitude,
                this.mapSettings.longitude
            );
        }, 0);
    }
}
