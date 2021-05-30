import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

    public loading: boolean = false;
    public authForm: FormGroup;

    constructor(
        public router: Router,
        private authService: AuthService,
        private fb: FormBuilder,
        public toastController: ToastController
    ) {}

    ngOnInit() {
        this.authForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public signin() {
        this.loading = true;
        const credentials = this.authForm.value;

        this.authService
            .attemptAuth('login', credentials)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (res) => {
                    this.router.navigateByUrl('/tabs/tab1', {
                        replaceUrl: true,
                    });
                },
                (err) => {
                    this.loading = false;
                    this.showError(err);
                },
                () => {
                    this.loading = false;
                }
            );
    }

    public signup() {
        this.router.navigateByUrl('/signup', { replaceUrl: true });
    }

    public forget() {
        this.router.navigateByUrl('/forget', { replaceUrl: true });
    }

    private async showError(err) {
        const toast = await this.toastController.create({
            message: 'Wrong email or password. Please try again.',
            duration: 5000,
            color: 'danger',
        });
        toast.present();
    }
}
