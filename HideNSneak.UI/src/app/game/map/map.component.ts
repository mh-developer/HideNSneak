import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { take, takeUntil } from 'rxjs/operators';
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
        accuracy: 500,
    } as MapSettings;
    @Output() public mapSettingsChange = new EventEmitter<MapSettings>();

    public options = {
        timeout: 100,
        maximumAge: 10,
        enableHighAccuracy: true,
    };

    public playersLocations: PlayerLocation[] = [];

    private geosubscribe: any;
    private unsubscribe$ = new Subject<any>();

    constructor(private platform: Platform, private gameService: GameService) {}

    ngOnInit() {
        this.onInit();
    }

    ngOnDestroy() {
        this.onDestroy();
    }

    public onInit() {
        this.loadRealTimeLocation();
        this.loadPlayersLocations();
    }

    public onDestroy() {
        window.navigator.geolocation.clearWatch(this.geosubscribe);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadRealTimeLocation() {
        this.platform.ready().then(() => {
            this.geosubscribe = window.navigator.geolocation.watchPosition(
                (data) => {
                    this.setLocationData(data);
                },
                (err) => {},
                this.options
            );
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
        this.mapSettings.latitude = data.coords.latitude;
        this.mapSettings.longitude = data.coords.longitude;
        this.mapSettings.accuracy = data.coords.accuracy;

        let location = {
            lat: this.mapSettings.latitude,
            lng: this.mapSettings.longitude,
        } as PlayerLocation;

        this.gameService
            .pingLocation(location)
            .pipe(take(1), takeUntil(this.unsubscribe$))
            .subscribe((ping) => ping);
    }
}
