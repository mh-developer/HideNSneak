import { take } from 'rxjs/operators';
import { Room } from './../shared/models/rooms.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from '../../shared/models/user.model';
import { ProfileService } from '../../profile/shared/profile.service';
import { RoomsService } from '../shared/rooms.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
    selector: 'app-room-details',
    templateUrl: './room-details.component.html',
    styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit, OnChanges {
    @Input() public room: Room;

    public roomPlayers: User[] = [];

    public get isAlreadyJoined(): boolean {
        return this.room.currentPlayers.includes(this.authService.getUserId());
    }

    public get isRoomOwner(): boolean {
        return this.room.owner === this.authService.getUserId();
    }

    constructor(
        private modalController: ModalController,
        private toastController: ToastController,
        private profileService: ProfileService,
        private roomsService: RoomsService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loadRoomPlayers();
    }

    ngOnChanges() {
        this.loadRoomPlayers();
    }

    public loadRoomPlayers() {
        this.roomPlayers = [];
        this.room.currentPlayers.forEach((userId) => {
            this.profileService
                .getUser(userId)
                .pipe(take(1))
                .subscribe((res) => {
                    this.roomPlayers.push(res);
                });
        });
    }

    public join() {
        this.roomsService
            .joinRoom(this.room.joinCode)
            .pipe(take(1))
            .subscribe(
                (res) => {
                    this.showSuccess();
                    this.dismiss();
                },
                (err) => {
                    this.showError(err);
                    this.dismiss();
                }
            );
    }

    public quit() {
        this.roomsService
            .quitRoom(this.room.joinCode)
            .pipe(take(1))
            .subscribe(
                (res) => {
                    this.showSuccess();
                    this.dismiss();
                },
                (err) => {
                    this.showError(err);
                    this.dismiss();
                }
            );
    }

    public remove() {
        this.roomsService
            .deleteRoom(this.room._id)
            .pipe(take(1))
            .subscribe(
                (res) => {
                    this.showSuccess();
                    this.dismiss();
                },
                (err) => {
                    this.showError(err);
                    this.dismiss();
                }
            );
    }

    private async showSuccess() {
        const toast = await this.toastController.create({
            message: 'Successful action.',
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

    public dismiss() {
        this.modalController.dismiss({
            dismissed: true,
        });
    }
}
