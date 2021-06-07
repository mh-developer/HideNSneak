import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoomsService } from './../shared/rooms.service';
import { Room } from './../shared/models/rooms.model';
import { ModalController } from '@ionic/angular';
import { RoomCreateComponent } from '../room-create/room-create.component';
import { RoomJoinComponent } from '../room-join/room-join.component';
import { RoomDetailsComponent } from '../room-details/room-details.component';
import { RoomLobbyComponent } from '../room-lobby/room-lobby.component';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent {
    public rooms: Room[] = [];

    private unsubscribe$ = new Subject<void>();

    constructor(
        private modalController: ModalController,
        private roomsService: RoomsService,
        private authService: AuthService
    ) {}

    ionViewWillEnter() {
        this.loadRooms();
    }

    ionViewWillLeave() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadRooms() {
        this.roomsService
            .getAllRooms()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.rooms = data;
            });
    }

    public isInLobby(room: Room) {
        return (
            room.currentPlayers.includes(this.authService.getUserId()) ||
            room.owner === this.authService.getUserId()
        );
    }

    public doRefresh(event) {
        setTimeout(() => {
            this.loadRooms();
            event.target.complete();
        }, 1000);
    }

    public async detailsRoomModal(room: Room) {
        const modal = await this.modalController.create({
            component: RoomDetailsComponent,
            swipeToClose: true,
            componentProps: {
                room: room,
            },
        });
        await modal.present();

        await modal.onDidDismiss();

        this.loadRooms();
    }

    public async createRoomModal() {
        const modal = await this.modalController.create({
            component: RoomCreateComponent,
            swipeToClose: true,
        });
        await modal.present();

        await modal.onDidDismiss();

        this.loadRooms();
    }

    public async joinRoomModal() {
        const modal = await this.modalController.create({
            component: RoomJoinComponent,
            swipeToClose: true,
        });
        await modal.present();

        await modal.onDidDismiss();

        this.loadRooms();
    }

    public async lobbyRoomModal(room: Room) {
        const modal = await this.modalController.create({
            component: RoomLobbyComponent,
            swipeToClose: true,
            componentProps: {
                room: room,
            },
        });
        await modal.present();

        await modal.onDidDismiss();

        this.loadRooms();
    }
}
