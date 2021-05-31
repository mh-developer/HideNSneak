import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { RoomsService } from '../shared/rooms.service';

@Component({
    selector: 'app-room-join',
    templateUrl: './room-join.component.html',
    styleUrls: ['./room-join.component.scss'],
})
export class RoomJoinComponent implements OnInit {
    public joinRoomForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private toastController: ToastController,
        private modalController: ModalController,
        private roomsService: RoomsService
    ) {}

    ngOnInit() {
        this.joinRoomForm = this.fb.group({
            code: ['', Validators.required],
        });
    }

    public join() {
        this.roomsService
            .joinRoom(this.joinRoomForm.value.code)
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
            message: 'Successfuly joined to room.',
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
