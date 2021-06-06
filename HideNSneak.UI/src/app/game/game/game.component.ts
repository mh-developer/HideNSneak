import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MapSettings } from '../shared/models/map.model';
import { PlayerLocation } from '../shared/models/game.model';
import { GameService } from './../shared/game.service';
import { RoomsService } from '../../rooms/shared/rooms.service';
import { Room } from '../../rooms/shared/models/rooms.model';
import { AuthService } from '../../auth/shared/auth.service';
import { colorOptions } from '../shared/models/game.model';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
    public mapSettings: MapSettings = {} as MapSettings;
    public currentUserId: string;
    public isEliminated: boolean = false;
    public room: Room = {} as Room;
    public currentPlayerLocation: PlayerLocation = {} as PlayerLocation;
    public playersLocations: PlayerLocation[] = [];
    public countOutOfZone = 0;

    public selectedColor: number = 0;
    public colorOptions: any[] = colorOptions;

    public options = {
        timeout: 12000,
        maximumAge: 3600,
        enableHighAccuracy: true,
    };

    private unsubscribe$ = new Subject<void>();

    constructor(
        private platform: Platform,
        private route: ActivatedRoute,
        private geolocation: Geolocation,
        private gameService: GameService,
        private roomsService: RoomsService,
        private authService: AuthService,
        private toastController: ToastController,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.loadCurrentUserId();
        this.loadGameSettings();
        this.loadLocation();
        this.loadRealTimeLocation();
        this.loadPlayersLocations();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadCurrentUserId() {
        this.currentUserId = this.authService.getUserId();
    }

    public loadGameSettings() {
        this.route.params
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((params) => {
                if (params['roomId']) {
                    const roomId = params['roomId'];
                    this.loadRoomData(roomId);
                }
            });
    }

    public loadRoomData(roomId: string) {
        this.roomsService
            .getRoom(roomId)
            .pipe(take(1), takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.room = data;
            });
    }

    public loadLocation() {
        this.gameService
            .getAllLocations()
            .pipe(take(1), takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                if (data) {
                    const location = data.find(
                        (x) => x.userId === this.authService.getUserId()
                    );
                    if (location) {
                        this.mapSettings = location;
                        this.selectedColor = colorOptions.findIndex(
                            (x) => x.key === this.mapSettings.color?.key
                        );
                    }
                }
            });
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
                    if (this.countOutOfZone < 5) {
                        this.setLocationData(data);
                    } else {
                        this.currentPlayerLocation = {} as PlayerLocation;
                    }
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

    public haversineDistance(mk1, mk2) {
        let R = 6371071; // Avg. Radius of the Earth in miles
        let rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
        let rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
        let difflat = rlat2 - rlat1; // Radian difference (latitudes)
        let difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

        let d =
            2 *
            R *
            Math.asin(
                Math.sqrt(
                    Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                        Math.cos(rlat1) *
                            Math.cos(rlat2) *
                            Math.sin(difflon / 2) *
                            Math.sin(difflon / 2)
                )
            );
        return d;
    }

    private setLocationData(data) {
        setTimeout(() => {
            this.currentPlayerLocation.lat = data.coords.latitude;
            this.currentPlayerLocation.lng = data.coords.longitude;

            let location = {
                lat: this.currentPlayerLocation?.lat,
                lng: this.currentPlayerLocation?.lng,
            } as PlayerLocation;

            let geofanceLocation = {
                lat: this.mapSettings.latitude,
                lng: this.mapSettings.longitude,
            };

            const distance = this.haversineDistance(location, geofanceLocation);

            if (
                distance /* - this.mapSettings.playerRadius */ >
                this.mapSettings.radius
            ) {
                this.countOutOfZone++;
                if (this.countOutOfZone >= 5) {
                    this.gameService
                        .notifyOutOfZone(location)
                        .pipe(takeUntil(this.unsubscribe$))
                        .subscribe((notify) => notify);
                    this.showAlert(
                        'Eliminated',
                        'You are eliminated. Out of zone.'
                    );
                }
            } else {
                this.gameService
                    .pingLocation(location)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe((ping) => ping);
            }
        }, 0);
    }

    private async showSuccess() {
        const toast = await this.toastController.create({
            message: 'In game area.',
            duration: 500,
            color: 'success',
        });
        toast.present();
    }

    private async showError(err) {
        const toast = await this.toastController.create({
            message: 'Out of zone.',
            duration: 500,
            color: 'danger',
        });
        toast.present();
    }

    private async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['OK'],
        });

        await alert.present();

        await alert.onDidDismiss();
    }
}
