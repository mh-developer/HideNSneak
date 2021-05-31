import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { ProfileService } from '../shared/profile.service';
import { AuthService } from '../../auth/shared/auth.service';
import { ModalController } from '@ionic/angular';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
    public tab: string = 'profile';
    public user: User = {} as User;

    private unsubscribe$ = new Subject<void>();

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private modalController: ModalController
    ) {}

    ngOnInit() {
        this.loadProfileData();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public loadProfileData() {
        const userId = this.authService.getUserId();
        this.profileService
            .getUser(userId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.user = data;
            });
    }

    public async presentModal() {
        const modal = await this.modalController.create({
            component: ProfileEditComponent,
            swipeToClose: true,
            componentProps: {
                userId: this.authService.getUserId(),
                user: this.user,
            },
        });
        await modal.present();

        await modal.onDidDismiss();

        this.loadProfileData();
    }
}
