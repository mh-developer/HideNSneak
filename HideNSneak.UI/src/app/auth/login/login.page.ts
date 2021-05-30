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

    public invalidLogin: boolean;
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
                    this.invalidLogin = false;
                    this.router.navigateByUrl('/tabs');
                },
                (err) => {
                    this.invalidLogin = true;
                    this.loading = false;
                    this.showError(err);
                },
                () => {
                    this.loading = false;
                }
            );
    }

    public signup() {
        this.router.navigateByUrl('/signup');
    }

    public forget() {
        this.router.navigateByUrl('/forget');
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
