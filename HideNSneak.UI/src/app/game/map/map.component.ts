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
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
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

    public playersLocations: PlayerLocation[] = [];

    private unsubscribe$ = new Subject<void>();

    constructor(
        private platform: Platform,
        private geolocation: Geolocation,
        private gameService: GameService
    ) {}

    ngOnInit() {
        this.loadRealTimeLocation();
        this.loadPlayersLocations();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadRealTimeLocation() {
        this.platform.ready().then(() => {
            let watch = this.geolocation.watchPosition(this.options);
            watch
                .pipe(
                    filter((p: any) => p.coords !== undefined),
                    takeUntil(this.unsubscribe$)
                )
                .subscribe((data: any) => {
                    this.setLocationData(data);
                });
        });
    }

    public loadPlayersLocations() {
        this.gameService
            .getChannel('location')
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
        }, 0);
    }
}
