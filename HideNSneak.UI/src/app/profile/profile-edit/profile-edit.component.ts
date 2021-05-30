import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { User } from './../../shared/models/user.model';
import { ProfileService } from '../shared/profile.service';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {
    @Input() public userId: string;
    @Input() public user: User;

    public userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private toastController: ToastController,
        private modalController: ModalController,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.userForm = this.fb.group({
            name: [this.user?.name || '', Validators.required],
            lastname: [this.user?.lastname || '', Validators.required],
            email: [this.user?.email || '', Validators.required],
        });
    }

    public save() {
        this.profileService
            .updateUser(this.userId, {
                id: this.userId,
                ...this.userForm.value,
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
            message: 'Successfuly updated user profile.',
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
