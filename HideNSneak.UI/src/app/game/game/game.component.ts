import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MapSettings } from '../shared/models/map.model';
import { PlayerLocation, colorOptions } from '../shared/models/game.model';
import { GameService } from './../shared/game.service';
import { RoomsService } from '../../rooms/shared/rooms.service';
import { Room } from '../../rooms/shared/models/rooms.model';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
    public mapSettings: MapSettings = {} as MapSettings;
    public currentUserId: string;
    public room: Room = {} as Room;
    public currentPlayerLocation: PlayerLocation = {} as PlayerLocation;
    public playersLocations: PlayerLocation[] = [];
    public eliminatedPlayers: string[] = [];
    public countOutOfZone = 0;
    public get isEliminated(): boolean {
        return this.countOutOfZone > 5;
    }
    public isGameStart: boolean = true;
    public isGameEnd: boolean = false;

    public selectedColor: number = 0;
    public colorOptions: any[] = colorOptions;

    public options = {
        timeout: 12000,
        maximumAge: 3600,
        enableHighAccuracy: true,
    };

    public seconds: number = 10;

    private geosubscribe: any;
    private unsubscribe$ = new Subject<void>();

    constructor(
        private router: Router,
        private platform: Platform,
        private route: ActivatedRoute,
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
        let countdown = setInterval(() => {
            this.seconds--;
            if (this.seconds === 8) this.showSuccess('READY!!!');
            if (this.seconds === 4) this.showSuccess('STEADY!!!');
            if (this.seconds === 1) this.showSuccess('GO!!!');
            if (this.seconds <= 0) clearInterval(countdown);
        }, 1000);
        setTimeout(() => {
            this.isGameStart = false;
            this.showSuccess('Game start!!!');

            this.loadRealTimeLocation();
            this.loadPlayersLocations();
            let refreshGame = setInterval(() => {
                this.isGameEnd = this.playersLocations.length < 1;
                this.playersLocations = [];
                if (this.isGameEnd) {
                    window.navigator.geolocation.clearWatch(this.geosubscribe);
                    clearInterval(refreshGame);
                }
            }, 10000);
        }, 11000);
    }

    ngOnDestroy() {
        window.navigator.geolocation.clearWatch(this.geosubscribe);
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
            this.geosubscribe = window.navigator.geolocation.watchPosition(
                (data) => {
                    if (
                        !this.isEliminated &&
                        !this.eliminatedPlayers.includes(this.currentUserId)
                    ) {
                        this.setLocationData(data);
                    } else {
                        this.currentPlayerLocation = {} as PlayerLocation;
                    }
                },
                (err) => {},
                this.options
            );
        });
    }

    public loadPlayersLocations() {
        this.gameService
            .getChannel('location')
            .bind(this.room?.joinCode, (data: PlayerLocation) => {
                if (
                    this.currentUserId !== data.userId &&
                    !this.eliminatedPlayers.includes(data.userId)
                ) {
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
                }
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
                userId: this.currentUserId,
                lat: this.currentPlayerLocation?.lat,
                lng: this.currentPlayerLocation?.lng,
                room: this.room?.joinCode,
            } as PlayerLocation;

            let geofanceLocation = {
                lat: this.mapSettings.latitude,
                lng: this.mapSettings.longitude,
            };

            const distanceToGeofanceZone = this.haversineDistance(
                location,
                geofanceLocation
            );

            if (
                distanceToGeofanceZone /* - this.mapSettings.playerRadius */ >
                this.mapSettings.radius
            ) {
                this.countOutOfZone++;
                if (this.isEliminated) {
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

            this.playersLocations.forEach((player) => {
                const distanceToPlayer = this.haversineDistance(
                    player,
                    this.currentPlayerLocation
                );

                if (distanceToPlayer < this.mapSettings.playerRadius) {
                    if (this.currentUserId === this.room.owner) {
                        this.eliminatedPlayers.push(player.userId);
                    }
                }
            });
        }, 0);
    }

    public playNewGame() {
        this.router.navigateByUrl(`/rooms`, {
            replaceUrl: true,
        });
    }

    private async showSuccess(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
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
