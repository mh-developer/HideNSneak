import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from '../../auth/shared/auth.service';
import { RoomsService } from '../shared/rooms.service';

@Component({
    selector: 'app-room-create',
    templateUrl: './room-create.component.html',
    styleUrls: ['./room-create.component.scss'],
})
export class RoomCreateComponent implements OnInit {
    public createRoomForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private toastController: ToastController,
        private modalController: ModalController,
        private authService: AuthService,
        private roomsService: RoomsService
    ) {}

    ngOnInit() {
        this.createRoomForm = this.fb.group({
            name: ['', Validators.required],
            maxPlayers: ['', Validators.required],
        });
    }

    public create() {
        this.roomsService
            .createRoom({
                ...this.createRoomForm.value,
                owner: this.authService.getUserId(),
            })
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
            message: 'Successfuly created room.',
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
